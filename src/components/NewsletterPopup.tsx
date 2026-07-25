"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeEmail } from "@/actions/newsletter";


export default function NewsletterPopup() {


  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);



 useEffect(() => {

  const shown = localStorage.getItem(
    "newsletter_popup_seen"
  );


  if (shown) return;



  function handleScroll() {


    const scrollPosition =
      window.scrollY;


    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;


    const scrollPercentage =
      (scrollPosition / pageHeight) * 100;



    if (scrollPercentage >= 35) {


      setOpen(true);


      localStorage.setItem(
        "newsletter_popup_seen",
        "true"
      );


      window.removeEventListener(
        "scroll",
        handleScroll
      );


    }


  }



  window.addEventListener(
    "scroll",
    handleScroll
  );



  return () => {

    window.removeEventListener(
      "scroll",
      handleScroll
    );

  };


}, []);




  async function handleSubscribe() {


    if (!email || !email.includes("@")) {

      setMessage("Please enter a valid email");

      return;

    }



    const result = await subscribeEmail(email);



    if (result.success) {


      setSuccess(true);

      setMessage("Email saved ✅");


      setTimeout(() => {

        setOpen(false);

      }, 1800);



    } else {


      setMessage(
        result.message || "Something went wrong"
      );


    }


  }






  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {

    if (e.key === "Enter") {

      handleSubscribe();

    }

  }





  return (


    <AnimatePresence>


      {open && (


        <motion.div


          initial={{
            opacity:0
          }}


          animate={{
            opacity:1
          }}


          exit={{
            opacity:0
          }}


          transition={{
            duration:0.35
          }}


          onClick={()=>setOpen(false)}


          className="
          fixed
          inset-0
          z-[999]
          flex
          items-center
          justify-center
          bg-black/50
          backdrop-blur-sm
          px-6
          "


        >




          <motion.div



            onClick={(e)=>e.stopPropagation()}



            initial={{
              opacity:0,
              scale:0.85,
              y:50
            }}



            animate={{
              opacity:1,
              scale:1,
              y:0
            }}



            exit={{
              opacity:0,
              scale:0.85,
              y:50
            }}



            transition={{
              duration:0.45,
              ease:"easeOut"
            }}



            className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-[35px]
            border
            border-red-500/30
            bg-gradient-to-br
            from-red-950/80
            via-black
            to-black
            p-8
            shadow-2xl
            shadow-red-900/40
            "


          >




            {/* RED GLOW EFFECT */}


            <div

              className="
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-red-600/20
              blur-[100px]
              "

            />



            <div

              className="
              absolute
              -bottom-24
              -left-24
              h-64
              w-64
              rounded-full
              bg-red-500/10
              blur-[90px]
              "

            />






            {/* CLOSE BUTTON */}


            <button


              onClick={()=>setOpen(false)}


              className="
              absolute
              right-5
              top-5
              z-10
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-gray-300
              transition
              hover:bg-white/20
              "


            >

              ✕


            </button>






            <div className="relative">





              {!success && (



                <>


                  <p className="
                  text-sm
                  uppercase
                  tracking-[0.3em]
                  text-red-400
                  ">

                    Kushtrimi NM Worldwide

                  </p>





                  <h2 className="
                  mt-5
                  text-3xl
                  font-black
                  text-white
                  ">

                    Exclusive Travel Offers

                  </h2>






                  <p className="
                  mt-4
                  leading-7
                  text-gray-400
                  ">

                    Receive luxury holidays,
                    hotel deals and exclusive offers.

                  </p>







                  <input


                    className="
                    mt-7
                    w-full
                    rounded-2xl
                    border
                    border-white/10
                    bg-black/70
                    p-4
                    text-white
                    outline-none
                    placeholder:text-gray-500
                    focus:border-red-500
                    "


                    type="email"


                    placeholder="Enter your email"



                    value={email}



                    onChange={(e)=>setEmail(e.target.value)}



                    onKeyDown={handleKeyDown}


                  />







                  <button


                    onClick={handleSubscribe}


                    className="
                    mt-5
                    w-full
                    rounded-full
                    bg-red-600
                    py-4
                    font-bold
                    text-white
                    transition
                    hover:bg-red-500
                    "


                  >

                    Subscribe


                  </button>






                  <p className="
                  mt-4
                  text-center
                  text-sm
                  text-gray-400
                  ">

                    {message}

                  </p>



                </>



              )}








              {success && (


                <motion.div


                  initial={{
                    opacity:0,
                    scale:0.8
                  }}


                  animate={{
                    opacity:1,
                    scale:1
                  }}


                  className="
                  py-10
                  text-center
                  "


                >


                  <div className="text-5xl">

                    ✅

                  </div>





                  <h2 className="
                  mt-5
                  text-3xl
                  font-black
                  text-white
                  ">

                    Email Saved!

                  </h2>






                  <p className="
                  mt-3
                  text-gray-400
                  ">

                    Thank you for joining
                    Kushtrimi NM Worldwide.

                  </p>




                </motion.div>


              )}







            </div>





          </motion.div>





        </motion.div>


      )}


    </AnimatePresence>


  );


}