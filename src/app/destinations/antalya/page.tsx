"use client";

import { motion } from "framer-motion";
import Counter from "@/components/animations/Counter";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";


export default function AntalyaPage() {


  return (

    <main className="destination-antalya overflow-hidden bg-black text-white">



      {/* HERO */}


      <section className="relative flex h-screen items-center justify-center overflow-hidden">


        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          src="/images/destinations/antalya/hero.jpg"
          alt="Antalya Turkey"
          className="absolute inset-0 h-full w-full object-cover"
        />



        <div className="absolute inset-0 bg-black/60" />



        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:1 }}
          className="relative z-10 max-w-5xl px-6 text-center"
        >



        <h1 className="text-6xl font-black leading-[0.9] md:text-8xl">

ANTALYA
<br />
<span className="block">
TURKEY
</span>

</h1>





<p className="mx-auto mt-8 max-w-3xl text-xl text-gray-200">


Luxury resorts, crystal waters and beaches


</p>


          <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">



            <motion.a
              whileHover={{ scale:1.05 }}
              href="https://wa.me/38349833888"
              target="_blank"
              className="rounded-full bg-red-600 px-10 py-4 font-semibold"
            >

              Request Your Offer

            </motion.a>





            <motion.a
              whileHover={{ scale:1.05 }}
              href="#overview"
              className="rounded-full border border-white/30 px-10 py-4 font-semibold backdrop-blur"
            >

              Discover Antalya

            </motion.a>



          </div>



        </motion.div>



      </section>







      {/* FLOATING MENU */}



      <section className="relative z-30 -mt-10">


        <div className="mx-auto flex max-w-fit rounded-full border border-white/10 bg-black/70 px-8 py-4 shadow-2xl backdrop-blur-xl">


          <div className="flex gap-8 text-sm text-gray-200">


            <a href="#overview">
              Overview
            </a>


            <a href="#areas">
              Areas
            </a>


            <a href="#hotels">
              Hotels
            </a>


            <a href="#experiences">
              Experiences
            </a>


            <a href="#reviews">
              Reviews
            </a>



          </div>


        </div>


      </section>







      {/* QUICK FACTS */}


<section className="border-b border-neutral-800 bg-neutral-950 py-24">


  <div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-6 md:grid-cols-4">


    {[
      {
        number:300,
        suffix:"+",
        text:"Sunny Days"
      },

      {
        number:200,
        suffix:"+",
        text:"Luxury Resorts"
      },

      {
        number:99,
        suffix:"+",
        text:"Holiday Regions"
      },

      {
        number:24,
        suffix:"/7",
        text:"Travel Support"
      }


    ].map((item,index)=>(


      <motion.div


        key={index}


        initial={{
          opacity:0,
          y:40
        }}



        whileInView={{
          opacity:1,
          y:0
        }}



        viewport={{
          once:true,
          amount:0.5
        }}



        transition={{
          duration:0.7,
          delay:index * 0.15
        }}



        className="text-center"


      >



        <h3 className="text-5xl font-black text-red-500 md:text-6xl">


          <Counter

            value={item.number}

            suffix={item.suffix}

          />


        </h3>





        <p className="mt-4 text-gray-400">

          {item.text}

        </p>




      </motion.div>



    ))}


  </div>


</section>









      {/* ABOUT */}




      <section
        id="overview"
        className="mx-auto max-w-7xl px-6 py-32"
      >



        <div className="grid items-center gap-20 lg:grid-cols-2">





          {/* IMAGE */}



          <motion.div

            initial={{
              opacity:0,
              x:-60
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.8
            }}

            className="relative"

          >



            <img

              src="/images/destinations/antalya/about.jpg"

              alt="Antalya"

              className="h-[560px] w-full rounded-[40px] object-cover"

            />




            <div className="absolute bottom-8 left-8 rounded-3xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">


              <p className="text-xl text-yellow-400">
                ★★★★★
              </p>


              <p className="mt-2 font-bold">
                Loved by travelers
              </p>


              <p className="text-sm text-gray-400">
                Premium holiday experiences
              </p>


            </div>



          </motion.div>







          {/* TEXT */}





          <motion.div

            initial={{
              opacity:0,
              x:60
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:0.8
            }}

          >



            <p className="uppercase tracking-[0.3em] text-red-500">

              Discover Antalya

            </p>





            <h2 className="mt-5 text-5xl font-black leading-tight">


              Where Mediterranean Dreams Begin


            </h2>





            <p className="mt-8 text-lg leading-9 text-gray-300">


              Ancient roots. Endless coast.

Experience the timeless charm and modern elegance of Antalya.


            </p>





            <div className="mt-10 grid grid-cols-2 gap-4">


              {[
                "🏖 Private Beaches",
                "🏨 Luxury Hotels",
                "🍽 All Inclusive",
                "☀️ Mediterranean Sun"
              ].map((item,index)=>(


                <motion.div

                  key={index}

                  whileHover={{
                    y:-5
                  }}

                  className="rounded-2xl bg-neutral-900 p-5"

                >

                  {item}

                </motion.div>


              ))}



            </div>



          </motion.div>



        </div>



      </section>

            {/* AREAS */}


<section
  id="areas"
  className="bg-neutral-950 py-32"
>


  <div className="mx-auto max-w-7xl px-6">



    <motion.div

      initial={{
        opacity:0,
        y:40
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      viewport={{
        once:true
      }}

      transition={{
        duration:0.8
      }}

      className="mb-16 text-center"

    >


      <p className="uppercase tracking-[0.3em] text-red-500">

        Explore Antalya

      </p>



      <h2 className="mt-5 text-5xl font-black">

        Find Your Perfect Holiday Area

      </h2>



      <p className="mx-auto mt-6 max-w-2xl text-gray-400">

        Every area of Antalya offers a different experience,
        from luxury resorts to nature and history.

      </p>



    </motion.div>








    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">





      {[
        {
          name:"Lara",
          image:"lara.jpg",
          text:
          "Luxury beachfront resorts and unforgettable family holidays."
        },


        {
          name:"Belek",
          image:"belek.jpg",
          text:
          "Ultra luxury resorts, golf and premium experiences."
        },


        {
          name:"Side",
          image:"side.jpg",
          text:
          "Ancient history combined with beautiful beaches."
        },


        {
          name:"Kemer",
          image:"kemer.jpg",
          text:
          "Mountains, nature and crystal-clear coastline."
        }


      ].map((area,index)=>(




        <motion.div


          key={area.name}


          initial={{
            opacity:0,
            y:60
          }}


          whileInView={{
            opacity:1,
            y:0
          }}


          viewport={{
            once:true,
            amount:0.2
          }}


          transition={{
            duration:0.7,
            delay:index * 0.15
          }}



          whileHover={{
            y:-12
          }}



          className="
          group
          relative
          h-[460px]
          overflow-hidden
          rounded-[32px]
          "

        >





          {/* IMAGE */}


          <img


            src={`/images/destinations/antalya/${area.image}`}


            alt={area.name}


            className="
            h-full
            w-full
            object-cover
            object-center
            transition
            duration-700
            group-hover:scale-110
            "


          />






          {/* DARK GRADIENT */}


          <div

            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
            "

          />








          {/* TEXT */}


          <div

            className="
            absolute
            bottom-0
            left-0
            right-0
            p-8
            "

          >



            <h3

              className="
              text-4xl
              font-black
              text-white
              "

            >

              {area.name}

            </h3>





            <p

              className="
              mt-4
              text-gray-200
              leading-7
              "

            >

              {area.text}

            </p>




          </div>






        </motion.div>





      ))}





    </div>





  </div>


</section>




      {/* HOTELS */}


<section
  id="hotels"
  className="relative bg-black py-32"
>


<div className="mx-auto max-w-7xl px-6">


<motion.div

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

className="mb-16 text-center"

>


<p className="uppercase tracking-[0.4em] text-red-500">
Luxury Collection
</p>


<h2 className="mt-5 text-5xl font-black">
Antalya Signature Resorts
</h2>


<p className="mx-auto mt-6 max-w-3xl text-gray-400">
Hand-picked luxury hotels selected for unforgettable Mediterranean holidays.
</p>


</motion.div>





<div className="relative">


{/* CUSTOM ARROWS */}

<button
className="hotel-prev hotel-arrow absolute left-0 top-1/2 z-20 -translate-y-1/2"
>
←
</button>


<button
className="hotel-next hotel-arrow absolute right-0 top-1/2 z-20 -translate-y-1/2"
>
→
</button>





<Swiper

className="hotel-swiper"

modules={[
Navigation,
Pagination,
Autoplay,
EffectCoverflow
]}


effect="coverflow"


grabCursor={true}


centeredSlides={true}


loop={true}


autoplay={{

delay:4500,

disableOnInteraction:false

}}



navigation={{

nextEl:".hotel-next",

prevEl:".hotel-prev"

}}



pagination={{

clickable:true

}}



coverflowEffect={{

rotate:0,

stretch:0,

depth:120,

modifier:2,

slideShadows:false

}}



breakpoints={{

320:{
slidesPerView:1
},


768:{
slidesPerView:2
},


1200:{
slidesPerView:3
}

}}

>





{[


{
name:"Rixos Premium Belek",
image:"rixos.jpg",
location:"Belek, Antalya",
description:
"Luxury beachfront resort with world-class restaurants, spa facilities and premium family experiences.",
tags:["Beach","Spa","Kids Club"]
},


{
name:"Maxx Royal Belek",
image:"maxxroyal.jpg",
location:"Belek, Antalya",
description:
"Ultra luxury resort featuring private villas, gourmet dining and exceptional personalised service.",
tags:["Golf","Luxury","Aqua Park"]
},


{
name:"Regnum Carya",
image:"regnum.jpg",
location:"Belek, Antalya",
description:
"Elegant beachfront resort offering championship golf, luxury suites and ultra all-inclusive experiences.",
tags:["Golf","Private Beach","Family"]
},


{
name:"Bosphorus Sorgun",
image:"bosphorussorgun.jpg",
location:"Side, Antalya",
description:
"Modern beachfront resort with stylish rooms, beautiful surroundings and excellent entertainment.",
tags:["Beach","Spa","Family"]
},


{
name:"Kremlin Palace",
image:"kremlin.jpg",
location:"Lara, Antalya",
description:
"Iconic luxury resort inspired by Russian architecture with impressive pools and entertainment.",
tags:["Luxury","Pools","Entertainment"]
},


{
name:"Selectum Noa Belek",
image:"selectumnoa.jpg",
location:"Belek, Antalya",
description:
"Premium resort combining modern design, beachfront relaxation and exceptional hospitality.",
tags:["Luxury","Beach","Relax"]
},


{
name:"NG Phaselis Bay",
image:"ngphaselis.jpg",
location:"Kemer, Antalya",
description:
"Exclusive resort surrounded by mountains, nature and crystal-clear Mediterranean waters.",
tags:["Nature","Spa","Luxury"]
},


{
name:"Rubi Platinum",
image:"rubiplatinum.jpg",
location:"Alanya, Antalya",
description:
"Stylish beachfront resort offering elegant accommodation, premium dining and relaxing holidays.",
tags:["Beach","Adults","Relax"]
},


{
name:"Swandor Kemer",
image:"swandor.jpg",
location:"Kemer, Antalya",
description:
"Family-friendly resort famous for entertainment, gardens and private beach experiences.",
tags:["Family","Entertainment","Beach"]
},


{
name:"Rixos Sungate",
image:"rixossungate.jpg",
location:"Kemer, Antalya",
description:
"Large luxury resort with private beaches, world-class facilities and unforgettable experiences.",
tags:["Beach","Spa","Luxury"]
}


].map((hotel,index)=>(



<SwiperSlide key={hotel.name}>


<motion.div


initial={{
opacity:0,
y:50
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}


transition={{
duration:.6,
delay:index*.08
}}



whileHover={{
y:-12
}}



className="flex h-[720px] flex-col overflow-hidden rounded-[40px] border border-white/5 bg-neutral-900 shadow-2xl"

>




{/* IMAGE */}


<div className="relative overflow-hidden">


<img

src={`/images/destinations/antalya/${hotel.image}`}

alt={hotel.name}

className="h-[300px] w-full object-cover transition duration-700 hover:scale-110"

/>


<div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent"/>


</div>






{/* CONTENT */}


<div className="flex flex-1 flex-col p-8">



<div className="flex items-center justify-between">


<p className="text-xl tracking-widest text-yellow-400">
★★★★★
</p>


<span className="rounded-full bg-red-600/20 px-4 py-2 text-xs uppercase tracking-widest text-red-400">
Luxury
</span>


</div>





<h3 className="mt-5 text-3xl font-black">
{hotel.name}
</h3>



<p className="mt-3 text-gray-400">
📍 {hotel.location}
</p>




<p className="mt-6 leading-8 text-gray-300">
{hotel.description}
</p>





<div className="mt-6 flex flex-wrap gap-2">


{hotel.tags.map(tag=>(


<span

key={tag}

className="rounded-full bg-black px-4 py-2 text-sm text-gray-300"

>

{tag}

</span>


))}


</div>






<motion.a

whileHover={{
scale:1.05
}}


href="https://wa.me/38349833888"

target="_blank"

rel="noopener noreferrer"


className="mt-auto inline-block rounded-full bg-red-600 px-8 py-4 text-center font-semibold transition hover:bg-red-700"

>

View Offer

</motion.a>



</div>



</motion.div>


</SwiperSlide>



))}



</Swiper>



</div>



</div>



</section>



     {/* EXPERIENCES */}


<section
  id="experiences"
  className="bg-neutral-950 py-32"
>


  <div className="mx-auto max-w-7xl px-6">





    <motion.div


      initial={{
        opacity:0,
        y:40
      }}


      whileInView={{
        opacity:1,
        y:0
      }}


      viewport={{
        once:true
      }}


      transition={{
        duration:0.8
      }}


      className="mb-16 text-center"

    >



      <p className="uppercase tracking-[0.3em] text-red-500">

        Beyond The Resort

      </p>





      <h2 className="mt-5 text-5xl font-black">

        Experience Antalya

      </h2>





      <p className="mx-auto mt-6 max-w-2xl text-gray-400">

        Discover unforgettable moments beyond your hotel.
        Adventure, culture and experiences waiting for you.

      </p>




    </motion.div>









    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">






      {[
        {
          title:"Boat Adventures",
          image:"boat.jpg",
          text:"Discover hidden bays, turquoise waters and the Mediterranean coastline."
        },


        {
          title:"Water Parks",
          image:"waterpark.jpg",
          text:"Perfect family entertainment with exciting slides and activities."
        },


        {
          title:"Ancient History",
          image:"history.jpg",
          text:"Explore ancient cities, ruins and thousands of years of culture."
        },


        {
          title:"Safari Tours",
          image:"safari.jpg",
          text:"Adventure through mountains, villages and Antalya nature."
        }


      ].map((experience,index)=>(





        <motion.div



          key={experience.title}




          initial={{
            opacity:0,
            y:60
          }}



          whileInView={{
            opacity:1,
            y:0
          }}



          viewport={{
            once:true,
            amount:0.2
          }}



          transition={{
            duration:0.7,
            delay:index*0.15
          }}




          whileHover={{
            y:-12
          }}





          className="
          group
          relative
          h-[430px]
          overflow-hidden
          rounded-[32px]
          "

        >







          {/* IMAGE */}


          <img


            src={`/images/destinations/antalya/${experience.image}`}



            alt={experience.title}



            className="
            h-full
            w-full
            object-cover
            object-center
            transition
            duration-700
            group-hover:scale-110
            "



          />








          {/* OVERLAY */}


          <div

            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/40
            to-transparent
            "

          />










          {/* CONTENT */}


          <div

            className="
            absolute
            bottom-0
            p-8
            "

          >





            <h3

              className="
              text-3xl
              font-black
              text-white
              "

            >

              {experience.title}

            </h3>





            <p

              className="
              mt-4
              leading-7
              text-gray-200
              "

            >

              {experience.text}

            </p>






          </div>






        </motion.div>





      ))}





    </div>





  </div>



</section>

            {/* INCLUDED */}



      <section className="border-y border-neutral-800 bg-black py-20">


        <div className="mx-auto max-w-7xl px-6">



          <motion.div

            initial={{
              opacity:0,
              y:30
            }}

            whileInView={{
              opacity:1,
              y:0
            }}

            viewport={{
              once:true
            }}

            className="mb-12 text-center"

          >


            <p className="uppercase tracking-[0.3em] text-red-500">
              Your Holiday Package
            </p>


            <h2 className="mt-5 text-5xl font-black">
              Everything Taken Care Of
            </h2>


          </motion.div>







          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">


            {[
              "✈ Flights",
              "🏨 Hotel",
              "🚐 Transfers",
              "🍽 Meals",
              "🛡 Assistance",
              "📞 Support"
            ].map((item,index)=>(


              <motion.div

                key={item}

                initial={{
                  opacity:0,
                  scale:0.8
                }}

                whileInView={{
                  opacity:1,
                  scale:1
                }}

                viewport={{
                  once:true
                }}

                transition={{
                  delay:index*0.1
                }}

                whileHover={{
                  y:-5
                }}

                className="rounded-3xl bg-neutral-900 p-6 text-center font-semibold"

              >

                {item}

              </motion.div>


            ))}


          </div>



        </div>


      </section>







      {/* REVIEWS */}


<section
  id="reviews"
  className="bg-neutral-950 py-32"
>


  <div className="mx-auto max-w-7xl px-6">



    <motion.div

      initial={{
        opacity:0,
        y:40
      }}

      whileInView={{
        opacity:1,
        y:0
      }}

      viewport={{
        once:true
      }}

      transition={{
        duration:0.8
      }}

      className="mb-16 text-center"

    >


      <p className="uppercase tracking-[0.3em] text-red-500">

        Guest Stories

      </p>



      <h2 className="mt-5 text-5xl font-black">

        Traveler Reviews

      </h2>



      <p className="mx-auto mt-6 max-w-2xl text-gray-400">

        Real experiences from travelers who discovered Antalya
        with Kushtrimi NM Worldwide.

      </p>



    </motion.div>







    <div className="grid gap-8 md:grid-cols-3">



      {[
        {
          country:"🇽🇰 Kosovo",

          name:"Arta Krasniqi",

          hotel:"Rixos Premium Belek",

          location:"Belek, Antalya, Turkey",

          text:
          "Everything was perfectly organized. The hotel exceeded our expectations and the support from Kushtrimi NM Worldwide was excellent."

        },


        {
          country:"🇩🇪 Germany",

          name:"Michael Weber",

          hotel:"Maxx Royal Belek",

          location:"Belek, Antalya, Turkey",

          text:
          "One of the best holidays we have ever experienced. Amazing resort, smooth transfers and professional service from start to finish."

        },


        {
          country:"🇬🇧 United Kingdom",

          name:"Ardian Juniku",

          hotel:"Regnum Carya",

          location:"Belek, Antalya, Turkey",

          text:
          "Everything was exactly as promised. Great communication, luxury accommodation and an unforgettable holiday."

        }

      ].map((review,index)=>(




        <motion.div


          key={review.name}


          initial={{

            opacity:0,

            y:70

          }}



          whileInView={{

            opacity:1,

            y:0

          }}



          viewport={{

            once:true,

            amount:0.2

          }}



          transition={{

            duration:0.7,

            delay:index * 0.15

          }}




          whileHover={{

            y:-10

          }}




          className="rounded-[32px] border border-neutral-800 bg-black p-8 transition"

        >





          {/* STARS */}


          <div className="flex items-center justify-between">


            <p className="text-2xl text-yellow-400">

              ★★★★★

            </p>


            <span className="text-2xl">

              {review.country.split(" ")[0]}

            </span>


          </div>








          {/* PERSON */}


          <h3 className="mt-6 text-2xl font-bold">

            {review.name}

          </h3>



          <p className="mt-2 text-gray-400">

            Verified Traveler

          </p>








          {/* HOTEL */}


          <div className="mt-6 rounded-2xl bg-neutral-900 p-5">


            <p className="font-bold text-white">

              🏨 {review.hotel}

            </p>


            <p className="mt-2 text-sm text-gray-400">

              📍 {review.location}

            </p>


          </div>








          {/* TEXT */}


          <p className="mt-6 leading-8 text-gray-300">


            "{review.text}"


          </p>





        </motion.div>



      ))}



    </div>




  </div>


</section>






      {/* FAQ */}




      <section
        id="faq"
        className="py-32"
      >



        <div className="mx-auto max-w-5xl px-6">



          <div className="mb-16 text-center">


            <p className="uppercase tracking-[0.3em] text-red-500">

              Need To Know

            </p>



            <h2 className="mt-5 text-5xl font-black">

              Frequently Asked Questions

            </h2>


          </div>







          <div className="space-y-6">



            {[
              {
                q:"When is the best time to visit Antalya?",
                a:"May until October is the most popular season with perfect beach weather."
              },

              {
                q:"Which area is best for families?",
                a:"Lara and Belek are ideal because of their luxury family resorts."
              },

              {
                q:"Are Antalya hotels all inclusive?",
                a:"Many resorts offer all-inclusive and ultra all-inclusive concepts."
              }

            ].map((faq)=>(


              <motion.div

                whileHover={{
                  x:10
                }}

                key={faq.q}

                className="rounded-3xl bg-neutral-950 p-8"

              >


                <h3 className="text-xl font-bold">

                  {faq.q}

                </h3>



                <p className="mt-3 text-gray-400">

                  {faq.a}

                </p>



              </motion.div>


            ))}




          </div>



        </div>


      </section>









      {/* FINAL CTA */}





      <section

        className="relative bg-cover bg-center py-44"

        style={{

          backgroundImage:
          "url('/images/destinations/antalya/footer.jpg')"

        }}

      >



        <div className="absolute inset-0 bg-black/70"/>




        <motion.div

          initial={{
            opacity:0,
            y:50
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="relative mx-auto max-w-5xl px-6 text-center"

        >



          <h2 className="text-5xl font-black md:text-7xl">

            Ready For Antalya?

          </h2>




          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-gray-300">


            Let Kushtrimi NM Worldwide create your perfect
            Mediterranean escape with luxury hotels,
            flights and complete travel support.


          </p>




          <motion.a

            whileHover={{
              scale:1.08
            }}

            href="https://wa.me/38349833888?text=Hello!%20I'm%20interested%20in%20Antalya."

            target="_blank"

            className="mt-10 inline-block rounded-full bg-red-600 px-12 py-5 font-semibold shadow-xl shadow-red-600/30"

          >

            Request Your Offer

          </motion.a>




        </motion.div>



      </section>





    </main>

  );

}