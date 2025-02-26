import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface FormContainerProps {
    title: string;
    children: React.ReactNode;
}

const FormContainer = ({ title, children }: FormContainerProps) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex justify-center pb-0">
                    <h2 className="text-2xl font-bold text-center text-primary">{title}</h2>
                </CardHeader>
                <CardBody className="flex flex-col gap-4 px-6 py-4">{children}</CardBody>
            </Card>
        </div>
    );
};

export default FormContainer;