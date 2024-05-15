import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "../layout";
import Login from "@/components/Login";
import Register from "@/components/Register";

const Registration = () => {
  return (
    <Tabs defaultValue="login" className="w-full px-4 md:w-[500px]">
      <TabsList className="w-full grid grid-cols-2 mb-1">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <Login/>
      <Register/>
    </Tabs>
  );
};

export default Registration;
