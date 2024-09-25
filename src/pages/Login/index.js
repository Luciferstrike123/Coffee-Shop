import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import MainLayout from "../../layouts/MainLayout";

function Login() {
    return (
        <MainLayout>
            <div className="flex flex-col items-center py-8 mt-16">
                <div className="w-[320px] md:w-[500px] border-[1.6px] px-5 md:px-10 pb-12 rounded-xl">
                    <h1 className="text-2xl text-center text-[#cda154] py-8">
                        LOG IN
                    </h1>
                    <LoginForm />
                </div>
                <span className="text-[#777] mt-3 text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-[#cda154] hover:underline">
                        Create Account
                    </Link>
                </span>
            </div>
        </MainLayout>
    );
}

export default Login;
