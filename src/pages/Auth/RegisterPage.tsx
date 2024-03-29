/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import loginImage from "@/assets/img/login.png";
import { Button } from "@/components/ui/button";
import Input from "@/components/CustomForm/Input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import shopanLogo from "@/assets/img/shopan-logo.png";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { IRegister, registerSchema, registerUser } from "@/utils/api/auth";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
      password: "",
      repassword: "",
    },
  });

  const registerHandler = async (values: IRegister) => {
    try {
      const res = await registerUser(values);

      toast({
        title: res?.message,
        description: "Profile Created",
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      reset();
      navigate("/login");
    }
  };

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row md:pr-[88px] xl:pr-0">
      <Toaster />
      <div className="relative h-[300px] w-full md:block md:h-screen md:w-[50%]">
        <img
          src={loginImage}
          alt="Login"
          className="h-full w-full object-cover"
        />

        <div className="absolute top-0 hidden w-full justify-center lg:flex">
          <img src={shopanLogo} alt="Shopan Logo" className="h-28 w-28" />
        </div>
      </div>

      <div className="flex w-[100%] items-center md:ml-[88px] md:mt-[220px] md:w-[50%] md:items-start">
        <div className="w-[600px] p-9 md:p-0">
          <h4 className="mb-[24px]">Register</h4>
          <p className="text-neutral-4 mb-8 text-[16px]">
            Already have an account?{" "}
            <Link to={`/login`} className="font-medium text-secondary-green">
              Login
            </Link>
          </p>
          <form onSubmit={handleSubmit(registerHandler)}>
            <div className="mb-5">
              <Input
                name="fullName"
                type="text"
                placeholder="Full Name"
                isSubmitting={isSubmitting}
                register={register("fullName")}
                errors={errors.fullName}
              />
            </div>

            <div className="mb-5">
              <Input
                name="userName"
                type="text"
                placeholder="User Name"
                isSubmitting={isSubmitting}
                register={register("userName")}
                errors={errors.userName}
              />
            </div>

            <div className="mb-5">
              <Input
                name="email"
                type="email"
                placeholder="mail@mail.com"
                isSubmitting={isSubmitting}
                register={register("email")}
                errors={errors.email}
              />
            </div>

            <div className="flex justify-between gap-2">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                isSubmitting={isSubmitting}
                register={register("password")}
                errors={errors.password}
              />

              <Input
                name="repassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repassword"
                isSubmitting={isSubmitting}
                register={register("repassword")}
                errors={errors.repassword}
              />

              <button
                type="button"
                className="max-h-[50px] hover:cursor-pointer"
                onClick={showPasswordHandler}
              >
                {showPassword ? (
                  <Eye className="h-[24px] w-[24px]" />
                ) : (
                  <EyeOff className="h-[24px] w-[24px]" />
                )}
              </button>
            </div>
            <div className="mb-8 mt-7 flex items-center">
              <input type="checkbox" className="mr-3 h-6 w-6 transform" />
              <p className="text-neutral-4">
                I agree with{" "}
                <span className="font-medium text-primary">Privacy Policy</span>{" "}
                and{" "}
                <span className="font-medium text-primary">Terms of Use</span>
              </p>
            </div>
            <Button
              type="submit"
              className="hover:bg-neutral-4 w-full rounded-lg py-3 font-medium"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : "Register"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
