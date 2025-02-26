"use client";

import { useState } from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { api } from "../utils/api";
import FormContainer from "../components/FormContainer";

const SetNewPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSetNewPassword = async () => {
        if (!password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        
        setError("");
        setIsLoading(true);
        
        try {
            const response = await api.post("/auth/set-new-password", { password });
            console.log("Password updated successfully:", response);
            setSuccess(true);
        } catch (error) {
            console.error("Set new password error:", error);
            setError("Failed to update password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormContainer title="Set New Password">
            {!success ? (
                <>
                    <p className="text-gray-600 text-sm text-center">
                        Create a new password for your account.
                    </p>
                    
                    <Input 
                        type="password" 
                        label="New Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        variant="bordered"
                        fullWidth
                        size="lg"
                        placeholder="Enter new password"
                    />
                    
                    <Input 
                        type="password" 
                        label="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        variant="bordered"
                        fullWidth
                        size="lg"
                        placeholder="Confirm new password"
                    />
                    
                    {error && <p className="text-danger text-sm">{error}</p>}
                    
                    <Button 
                        color="primary"
                        onPress={handleSetNewPassword}
                        className="mt-2"
                        fullWidth
                        size="lg"
                        isLoading={isLoading}
                    >
                        Update Password
                    </Button>
                </>
            ) : (
                <div className="text-center py-4">
                    <p className="text-success mb-4">Password updated successfully!</p>
                    <Button as={Link} href="/login" color="primary">
                        Go to Login
                    </Button>
                </div>
            )}
        </FormContainer>
    );
};

export default SetNewPassword;