'use client';
import "reflect-metadata";
import Dashboard from "./Dashboard/page";
import TeacherLu from "./TeacherLu/page";
import UserManagePage from "./user/page";
import LoginPage from "./login/page";
import User from "./userTable/page";


export default function Home() {
  return (
    <>
      <LoginPage/>
    </>    
  )
}
