"use client";

import { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { api } from "../utils/api"; //TODO: use alias
import FormContainer from "../components/FormContainer";

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
                color="primary"
                onPress={handleLogin}
                className="mt-2"
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