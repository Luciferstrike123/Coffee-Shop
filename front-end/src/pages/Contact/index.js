import React from "react";
import MainLayout from "../../layouts/MainLayout";
import ContactForm from "../../components/ContactForm";

function Contact() {
  return (
    <MainLayout>
      <div className="h-full pt-2 pb-8 px-6 md:px-8 flex justify-center">
        <div className="text-white flex flex-col items-center md:w-3/6 px-6">
          <span className="text-sm md:text-base text-center">
            You can contact us to get information about the world's strongest coffee, the coffee shop, high caffeine coffees, events and news.
          </span>

          <div className="flex flex-col text-sm md:text-base">
            <span className="mt-4">
              <span className="text-[#cda154]">Email: </span>&nbsp;
              thecoffeeshop@gmail.com
            </span>
            <span className="mt-2">
              <span className="text-[#cda154]">Telephone: </span>&nbsp; 0850 888
              2626
            </span>
          </div>
          <h1 className="text-lg md:text-2xl mt-4">
            <span className="text-[#cda154]">Where is</span> the Coffee Shop? 
          </h1>
          <span className="mt-3">
            <address className="text-sm md:text-base text-center md:text-start">
              Somewhere in the world
            </address>
          </span>
          <ContactForm />
        </div>
      </div>
    </MainLayout>
  );
}

export default Contact;
