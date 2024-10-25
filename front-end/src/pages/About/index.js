import React from "react";
import caffeineTable from "../../assets/caffeine-table.png";
import MainLayout from "../../layouts/MainLayout";

function About() {
  return (
    <MainLayout>
      <div className="h-full flex pt-6 pb-12 justify-center">
        <div className="w-5/6 md:w-3/6 text-white">
          <h1 className="text-2xl md:text-3xl text-center mb-4">
            <span className="text-[#cda154]">The Coffee</span> Shop
          </h1>
          <div className="flex flex-col">
            <span className="text-sm md:text-base">
                As a response to coffees that were not strong enough to wake you up, we founded Turkey's first high-caffeine coffee brand, The Coffee Shop, in 2017.
            </span>
            <span className="text-sm md:text-base mt-4">
                Mornings that took hours to wake up, nights that ended early and our coffee addiction made us search for a coffee that would keep us awake for hours. When we couldn't find it, we decided to make it. But with a light drink. We worked for months, received training, and made experiments. Finally, we did what we were looking for. We offered the world's most caffeinated coffee with a comfortable drink.
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl text-center mt-8 mb-4">
            The world's <span className="text-[#cda154]">Strongest Coffee</span>
          </h1>
          <div className="flex flex-col justify-center">
            <img
              className="my-6 md:px-36"
              src="https://cdn.shopify.com/s/files/1/2714/0802/files/coffeetowakethedead_42b46837-7978-4d7a-b2a6-d53e841b73c5_480x480.gif?v=1548072780"
              alt=""
            />

            <span className="text-sm md:text-base">
            As a result of tests conducted by the Ministry of Food and Agriculture and the Swiss-based SGS Laboratory, which is valid all over the world, The Coffee is far ahead of its competitors with its caffeine content of <span className="font-bold">23,2 gram</span>{" "} per kilogram, and is at the top as the coffee with the highest caffeine content in the world. You can click on the link to learn about this testing process in detail.
            </span>

            <span className="text-sm md:text-base mt-4">
            This high caffeine content comes entirely from the structural characteristics of the beans used. The Coffee{" "} <span className="font-bold">100% natural </span> is offered to you without any chemical treatment and without any additives. With its soft drink and aroma, it wins the appreciation of all coffee lovers and offers flavor and energy together.
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl text-center mt-8 mb-4">
            <span className="text-[#cda154]">Caffeine</span> Ratio
          </h1>
          <div className="flex flex-col justify-center">
            <span className="text-sm md:text-base">
                We determined our The Coffee, which offers a high caffeine level with a comfortable drink, after a long roasting marathon and after trying blends from 25 different beans. The South American - Pacific blend was decided upon. As a result of the 5 million cups of The Coffee that have been drunk since its establishment, the effect of the high caffeine and the surprise that it offers a taste and comfortable drink despite this caffeine level constituted a large part of the comments made.
            </span>

            <img className="my-6 md:px-36" src='https://th.bing.com/th/id/OIP._qr033yR_o2H_VzRTsR-hgHaKX?rs=1&pid=ImgDetMain' alt="" />

            <span className="text-sm md:text-base mt-4">
                While the caffeine content of standard filter coffees is 1%, The Coffee's caffeine content is 2.32% according to the latest test results. As a quick calculation, the amount of caffeine you will get from a cup of filter coffee is 150 mg, while this amount approaches 350 mg in a cup of filter coffee made from The Coffee.
            </span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default About;
