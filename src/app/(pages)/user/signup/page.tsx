"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className="p-8">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormItem>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormControl>
            <Input id="name" placeholder="Your Name" {...register("name")} />
          </FormControl>
          {errors.name && (
            <FormMessage type="error">{errors.name.message}</FormMessage>
          )}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormControl>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              {...register("password")}
            />
          </FormControl>
          {errors.password && (
            <FormMessage type="error">{errors.password.message}</FormMessage>
          )}
        </FormItem>
        <FormItem>
          <FormLabel htmlFor="confirmPassword">Re-enter Password</FormLabel>
          <FormControl>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter Password"
              {...register("confirmPassword")}
            />
          </FormControl>
          {errors.confirmPassword && (
            <FormMessage type="error">
              {errors.confirmPassword.message}
            </FormMessage>
          )}
        </FormItem>
        <Button type="submit">Sign Up</Button>
      </Form>
      <div className="mt-4 text-center">
        <p>Or sign up with</p>
        <Button variant="outline" className="mt-2 mx-auto">
          Google
        </Button>
      </div>
    </div>
  );
};

export default SignUpPage;
