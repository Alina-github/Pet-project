import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FormContainerProps {
  title: string;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  description?: string;
}

const FormContainer: React.FC<FormContainerProps> = ({
  title,
  children,
  footerContent,
  description,
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footerContent && <CardFooter>{footerContent}</CardFooter>}
    </Card>
  );
};

export default FormContainer;
