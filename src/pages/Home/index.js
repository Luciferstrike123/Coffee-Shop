import React from "react";
import coffeeVideo from "../../assets/coffee-video.mp4";
import coffeeCup from "../../assets/coffee-cup.jpg";
import shippingImg from "../../assets/shipping.jpg";
import coffeeRoast from "../../assets/coffee-roast.jpg";
import natureImg from "../../assets/nature.jpg";
import coffee1 from "../../assets/1kg.png";
import coffee2 from "../../assets/500g.png";
import coffee3 from "../../assets/250g.png";
import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import { Zoom, Fade, Slide } from "react-awesome-reveal";
import Button from "../../components/Button";
import ShopItem from "../../components/ShopItem";

function Home() {
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row h-[36rem] w-full px-4">
        <div className="text-white w-full flex flex-1 flex-col text-center justify-center ">
          <Slide direction="down">
            <h1 className="text-3xl lg:text-5xl font-medium py-3">
              The World's Strongest Coffee!
            </h1>
            <span className="text-xl md:text-4xl font-normal text-[#cda154] py-3">
              HIGH CAFFEINE, COMFORTABLE DRINK
            </span>
          </Slide>
          <Slide>
            <div className="flex justify-center pt-5">
              <Link
                to="/shop"
                className="w-full max-w-[180px] md:max-w-[200px] lg:max-w-[230px]"
              >
                <Button
                  name="Check Out Products"
                  className="text-[#777] hover:text-white hover:border-[#cda154] focus:border-[#cda154] text-center text-lg"
                />
              </Link>
            </div>
          </Slide>
          <Slide>
            <div className="py-8 px-24 hidden lg:block">
              <span className="text-center">
                In 2016, we started our work to create a special coffee that would offer high caffeine in a 100% natural way with a smooth drink. After long studies and countless trials, we found the unique coffee blend we were looking for and sent it to the SGS Food Control Laboratory in Switzerland for caffeine testing. The result was as expected: The Coffee is by far the strongest coffee in the world!
              </span>
            </div>
          </Slide>
        </div>
        <div className="relative select-none flex flex-1">
          <img
            src={coffeeCup}
            className="h-[17.5rem] w-[17.5rem] md:h-[24rem] md:w-[24rem] lg:h-[32rem] lg:w-[32rem] absolute object-cover z-10 mix-blend-multiply right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
            alt="coffee bean"
            draggable="false"
          />
          <video
            className="h-[17.4rem] w-[17.4rem] md:h-[23.9rem] md:w-[23.9rem] lg:h-[31.9rem] lg:w-[31.9rem]  position absolute object-cover right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2"
            autoPlay
            muted
            loop
          >
            <source src={coffeeVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="py-4 md:py-4 px-4 md:px-8">
        <h1 className="text-[#cda154] text-lg md:text-2xl text-center py-2">
          -Most Purchased Products-
        </h1>
        <Zoom>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center py-6">
            <ShopItem
              img={coffee1}
              name="The Coffee (1 kg)"
              price="249.99"
              button="false"
              className="h-52 w-52 md:h-64 md:w-64"
            />
            <ShopItem
              img={coffee2}
              name="The Coffee (500 g)"
              price="149.99"
              button="false"
              className="h-52 w-52 md:h-64 md:w-64"
            />
            <ShopItem
              img={coffee3}
              name="The Coffee (250 g)"
              price="74.99"
              button="false"
              className="h-52 w-52 md:h-64 md:w-64"
            />
          </div>
        </Zoom>
      </div>
      <div className="py-4 md:py-10 px-4 md:px-8">
        <div className="flex flex-col md:flex-row py-2 md:py-6">
          <Fade
            direction="down"
            className="flex flex-1 justify-center items-center order-2 md:order-1"
          >
            <div className="flex flex-col items-center justify-center w-full py-6 md:py-0">
              <h1 className="text-[#cda154] text-base md:text-xl">
                - The Strongest Coffee -
              </h1>
              <h1 className="text-white text-2xl md:text-3xl">100% Natural</h1>
              <p className="text-white py-4 md:py-6 text-sm md:text-lg leading-7 md:leading-9 text-center max-w-xl">
              The Coffee's high caffeine content comes from the coffee beans in its blend. Our coffees are not subjected to any chemical
              treatments and contain no additives.
              </p>
            </div>
          </Fade>
          <Slide direction="right" className="order-1 md:order-2">
            <img
              src={natureImg}
              alt=""
              className="h-52 md:h-64 lg:h-96 rounded-xl mx-auto"
            />
          </Slide>
        </div>
        <div className="flex flex-col md:flex-row py-2 md:py-6">
          <Fade
            direction="down"
            className="flex flex-1 justify-center items-center order-2"
          >
            <div className="flex flex-col items-center w-full py-6 md:py-0">
              <h1 className="text-[#cda154] text-base md:text-xl">
                - The Freshest Coffee -
              </h1>
              <h1 className="text-white text-2xl md:text-3xl">
                Weekly Coffee
              </h1>
              <p className="text-white py-4 md:py-6 text-sm md:text-lg leading-7 md:leading-9 text-center max-w-xl">
                In our coffee factory, we roast our coffees weekly, grind them to order and ship them in their freshest form.
              </p>
            </div>
          </Fade>
          <Slide direction="left" className="order-1">
            <img
              src={coffeeRoast}
              alt=""
              className="h-52 md:h-64 lg:h-96 rounded-xl mx-auto"
            />
          </Slide>
        </div>
        <div className="flex flex-col md:flex-row pt-2 pb-0 md:py-6">
          <Fade
            direction="down"
            className="flex flex-1 justify-center items-center order-2 md:order-1"
          >
            <div className="flex flex-col items-center w-full py-6 md:py-0">
              <h1 className="text-[#cda154] text-base md:text-xl">
                - Fast and Free Shipping -
              </h1>
              <h1 className="text-white text-2xl md:text-3xl">
                Free Delivery
              </h1>
              <p className="text-white py-4 md:py-6 text-sm md:text-lg leading-7 md:leading-9 text-center max-w-xl">
                We deliver orders placed before 14:00 on weekdays to cargo on the same day. We solve any problems that may occur during shipment with our professional support team.
              </p>
            </div>
          </Fade>
          <Slide direction="right" className="order-1 md:order-2">
            <img
              src={shippingImg}
              alt=""
              className="h-52 md:h-64 lg:h-96 rounded-xl mx-auto"
            />
          </Slide>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
