import { Card, CardBody, CardHeader } from '@heroui/react';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
}

const CenteredFormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex justify-center pb-0">
          <h2 className="text-center text-2xl font-bold text-primary">{title}</h2>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 px-6 py-4">{children}</CardBody>
      </Card>
    </div>
  );
};

export default CenteredFormContainer;
