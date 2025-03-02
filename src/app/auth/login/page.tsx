"use client";

import { Button } from '@heroui/react';
import { useState } from "react";
import { Input, Link } from "@heroui/react";
import { api } from "@/src/utils/api"; //TODO: use alias
import FormContainer from "../../components/FormContainer";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        
        setError("");
        setIsLoading(true);
        
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("Login successful:", response);
            // Handle successful login (e.g., redirect)
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer title="Login">
            <Input 
                type="email" 
                label="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                variant="bordered"
                fullWidth
                size="lg"
                placeholder="Enter your email"
            />
            
            <Input 
                type="password" 
                label="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                variant="bordered"
                fullWidth
                size="lg"
                placeholder="Enter your password"
            />
            
            {error && <p className="text-danger text-sm">{error}</p>}
            
            <Button
                color="danger"
                onPress={handleLogin}
                //className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 size='lg'"
                fullWidth
                size="lg"
                isLoading={isLoading}
            >
                Login
            </Button>
            
            <div className="flex justify-center mt-2">
                <Link href="/reset-password" className="text-sm">Forgot password?</Link>
            </div>
        </FormContainer>
    );
};

export default Login;