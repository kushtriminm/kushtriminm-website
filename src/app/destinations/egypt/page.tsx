"use client";

import { motion } from "framer-motion";

import Counter from "@/components/animations/Counter";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow
} from "swiper/modules";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";


export default function EgyptPage() {


return (

<main className="destination-egypt overflow-hidden bg-black text-white">



{/* HERO */}


<section className="relative flex h-screen items-center justify-center overflow-hidden">



<motion.img

initial={{
scale:1.15
}}

animate={{
scale:1
}}

transition={{
duration:2
}}

src="/images/destinations/egypt/hero.jpg"

alt="Hurghada Egypt"

className="absolute inset-0 h-full w-full object-cover"

/>




<div className="absolute inset-0 bg-black/60"/>





<motion.div


initial={{
opacity:0,
y:40
}}


animate={{
opacity:1,
y:0
}}


transition={{
duration:1
}}



className="relative z-10 max-w-5xl px-6 text-center"



>





<h1 className="text-6xl font-black leading-[0.9] md:text-8xl">

HURGHADA
<br />
<span className="block">
EGYPT
</span>

</h1>





<p className="mx-auto mt-8 max-w-3xl text-xl text-gray-200">


Luxury resorts, crystal waters and unforgettable
Red Sea adventures.


</p>






<div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">





<motion.a

whileHover={{
scale:1.05
}}

href="https://wa.me/38349833888"

target="_blank"

className="rounded-full bg-orange-500 px-10 py-4 font-semibold text-black"

>


Request Your Offer


</motion.a>







<motion.a

whileHover={{
scale:1.05
}}

href="#overview"

className="rounded-full border border-white/30 px-10 py-4 font-semibold backdrop-blur"

>


Discover Egypt


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
number:365,
suffix:"+",
text:"Sunny Days"
},


{
number:150,
suffix:"+",
text:"Luxury Resorts"
},


{
number:40,
suffix:"+",
text:"Diving Spots"
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
once:true
}}


transition={{
delay:index*0.15
}}


className="text-center"



>



<h3 className="text-5xl font-black text-orange-500 md:text-6xl">


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



className="relative"



>


<img


src="/images/destinations/egypt/about.jpg"


alt="Hurghada Egypt"


className="h-[560px] w-full rounded-[40px] object-cover"



/>





<div className="absolute bottom-8 left-8 rounded-3xl border border-white/10 bg-black/80 p-6 backdrop-blur-xl">



<p className="text-xl text-orange-400">

★★★★★

</p>



<p className="mt-2 font-bold">

Loved by travelers

</p>



<p className="text-sm text-gray-400">

Red Sea luxury experiences

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



>



<p className="uppercase tracking-[0.3em] text-orange-500">

Discover Hurghada

</p>






<h2 className="mt-5 text-5xl font-black leading-tight">


Where Desert Meets The Red Sea


</h2>







<p className="mt-8 text-lg leading-9 text-gray-300">


Experience Egypt's stunning coastline with
luxury all-inclusive resorts, turquoise waters,
desert adventures and unforgettable memories.


</p>








<div className="mt-10 grid grid-cols-2 gap-4">



{[


"🌊 Red Sea Beaches",

"🏨 Luxury Resorts",

"🐠 Diving & Snorkeling",

"🏜 Desert Adventures"



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


<p className="
uppercase
tracking-[0.4em]
text-orange-500
">

Luxury Collection

</p>



<h2 className="
mt-5
text-5xl
font-black
">

Hurghada Signature Resorts

</h2>




<p className="
mx-auto
mt-6
max-w-3xl
text-gray-400
">

Hand-picked Red Sea resorts selected for
luxury, relaxation and unforgettable holidays.

</p>


</motion.div>







<div className="relative">



<button

className="
egypt-prev
absolute
left-0
top-1/2
z-20
-translate-y-1/2
rounded-full
bg-orange-600
px-5
py-3
text-2xl
"

>

←

</button>





<button

className="
egypt-next
absolute
right-0
top-1/2
z-20
-translate-y-1/2
rounded-full
bg-orange-600
px-5
py-3
text-2xl
"

>

→

</button>






<Swiper

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

nextEl:".egypt-next",

prevEl:".egypt-prev"

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
name:"Serry Beach Resort",
image:"serry.jpg",
location:"Hurghada, Egypt",
description:
"Modern beachfront resort with stylish rooms, beautiful pools and a relaxing Red Sea atmosphere.",
tags:[
"Beach",
"Spa",
"Luxury"
]
},



{
name:"Desert Rose Resort",
image:"desertrose.jpg",
location:"Hurghada, Egypt",
description:
"Popular all-inclusive resort with private lagoon, gardens and excellent family facilities.",
tags:[
"All Inclusive",
"Family",
"Lagoon"
]
},




{
name:"Caves Beach Resort",
image:"caves.jpg",
location:"Hurghada, Egypt",
description:
"Unique adults-focused resort inspired by caves with amazing architecture and beachfront location.",
tags:[
"Adults",
"Beach",
"Unique"
]
},




{
name:"Jaz Elite Asteria",
image:"jaz.jpg",
location:"Hurghada, Egypt",
description:
"Premium resort offering elegant rooms, fine dining and relaxing Red Sea holidays.",
tags:[
"Premium",
"Relax",
"Beach"
]
},




{
name:"Pickalbatros Citadel",
image:"citadel.jpg",
location:"Hurghada, Egypt",
description:
"Iconic stone-built luxury resort overlooking the Red Sea with incredible views.",
tags:[
"Sea View",
"Luxury",
"Family"
]
},




{
name:"Pickalbatros Jungle Aqua Park Resort",
image:"neverland.jpg",
location:"Hurghada, Egypt",
description:
"Large entertainment resort with water parks, activities and unforgettable family experiences.",
tags:[
"Water Park",
"Family",
"Entertainment"
]
},




{
name:"Rixos Premium Magawish",
image:"megawish.jpg",
location:"Hurghada, Egypt",
description:
"Ultra luxury beachfront resort with premium restaurants, elegant design and exclusive service.",
tags:[
"Ultra Luxury",
"Beach",
"Spa"
]
},




{
name:"Steigenberger ALDAU Beach",
image:"steigenberger.jpg",
location:"Hurghada, Egypt",
description:
"Elegant five-star beachfront resort famous for golf, wellness and exceptional hospitality.",
tags:[
"Golf",
"Spa",
"Luxury"
]
}



].map((hotel,index)=>(



<SwiperSlide

key={hotel.name}

>


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

delay:index*.1

}}



whileHover={{

y:-12

}}




className="
flex
h-[720px]
flex-col
overflow-hidden
rounded-[40px]
border
border-white/5
bg-neutral-900
shadow-2xl
"



>





<div className="
relative
overflow-hidden
">


<img

src={`/images/destinations/egypt/${hotel.image}`}

alt={hotel.name}


className="
h-[300px]
w-full
object-cover
transition
duration-700
hover:scale-110
"

/>


<div className="
absolute
inset-0
bg-gradient-to-t
from-neutral-900/70
via-neutral-900/20
to-transparent
"

/>


</div>








<div className="
flex
flex-1
flex-col
p-8
">


<div className="
flex
items-center
justify-between
">


<p className="
text-xl
tracking-widest
text-yellow-400
">

★★★★★

</p>



<span className="
rounded-full
bg-orange-600/20
px-4
py-2
text-xs
uppercase
tracking-widest
text-orange-400
">

Luxury

</span>



</div>





<h3 className="
mt-5
text-3xl
font-black
">

{hotel.name}

</h3>




<p className="
mt-3
text-gray-400
">

📍 {hotel.location}

</p>





<p className="
mt-6
leading-8
text-gray-300
">

{hotel.description}

</p>







<div className="
mt-6
flex
flex-wrap
gap-2
">


{hotel.tags.map(tag=>(


<span

key={tag}

className="
rounded-full
bg-black
px-4
py-2
text-sm
text-gray-300
"

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


className="
mt-auto
rounded-full
bg-orange-600
px-8
py-4
text-center
font-semibold
hover:bg-orange-700
"

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

className="mb-16 text-center"

>


<p className="
uppercase
tracking-[0.3em]
text-orange-500
">

Beyond The Resort

</p>



<h2 className="
mt-5
text-5xl
font-black
">

Experience Hurghada

</h2>


</motion.div>





<div className="
grid
gap-8
md:grid-cols-2
lg:grid-cols-4
">


{[
{
title:"Red Sea Diving",
image:"diving.jpg",
text:"Explore coral reefs, colourful marine life and crystal clear waters."
},


{
title:"Desert Safari",
image:"safari.jpg",
text:"Discover Egypt's desert landscapes, Bedouin culture and unforgettable sunsets."
},


{
title:"Boat Adventures",
image:"boat.jpg",
text:"Enjoy islands, snorkeling and unforgettable Red Sea boat trips."
},


{
title:"Dolphin Experiences",
image:"dolphins.jpg",
text:"Swim alongside dolphins and discover one of the Red Sea's most magical experiences."
}

].map((experience,index)=>(


<motion.div

key={experience.title}

whileHover={{
y:-10
}}

className="
group
relative
h-[430px]
overflow-hidden
rounded-[35px]
"


>


<img

src={`/images/destinations/egypt/${experience.image}`}

alt={experience.title}

className="
h-full
w-full
object-cover
transition
duration-700
group-hover:scale-110
"

/>


<div className="
absolute
inset-0
bg-gradient-to-t
from-black
to-transparent
"/>



<div className="
absolute
bottom-0
p-8
">


<h3 className="
text-3xl
font-black
">

{experience.title}

</h3>



<p className="
mt-4
text-gray-300
">

{experience.text}

</p>


</div>


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

className="mb-16 text-center"

>


<p className="uppercase tracking-[0.3em] text-orange-500">

Guest Stories

</p>



<h2 className="mt-5 text-5xl font-black">

Traveler Reviews

</h2>



<p className="mx-auto mt-6 max-w-2xl text-gray-400">

Real experiences from travelers enjoying
Hurghada with Kushtrimi NM Worldwide.

</p>


</motion.div>







<div className="grid gap-8 md:grid-cols-3">


{[

{
country:"🇽🇰 Kosovo",
name:"Elira Krasniqi",
hotel:"Rixos Premium Magawish",
location:"Hurghada, Egypt",
text:
"Everything was perfectly organised. The resort was amazing and the whole holiday was stress free."
},


{
country:"🇩🇪 Germany",
name:"Thomas Müller",
hotel:"Steigenberger ALDAU Beach",
location:"Hurghada, Egypt",
text:
"Beautiful hotel, amazing service and unforgettable Red Sea experience. Everything was handled professionally."
},


{
country:"🇬🇧 United Kingdom",
name:"Daniel Williams",
hotel:"Pickalbatros Citadel",
location:"Hurghada, Egypt",
text:
"Fantastic resort, incredible views and excellent support from Kushtrimi NM Worldwide."
}


].map((review,index)=>(



<motion.div

key={review.name}

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
delay:index*0.15
}}

whileHover={{
y:-10
}}

className="
rounded-[32px]
border
border-neutral-800
bg-black
p-8
"

>



<div className="flex items-center justify-between">


<p className="text-2xl text-yellow-400">

★★★★★

</p>


<span className="text-2xl">

{review.country.split(" ")[0]}

</span>


</div>





<h3 className="mt-6 text-2xl font-bold">

{review.name}

</h3>




<p className="mt-2 text-gray-400">

Verified Traveler

</p>







<div className="mt-6 rounded-2xl bg-neutral-900 p-5">


<p className="font-bold">

🏨 {review.hotel}

</p>



<p className="mt-2 text-sm text-gray-400">

📍 {review.location}

</p>



</div>






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


<p className="uppercase tracking-[0.3em] text-orange-500">

Need To Know

</p>



<h2 className="mt-5 text-5xl font-black">

Frequently Asked Questions

</h2>



</div>







<div className="space-y-6">


{[

{
q:"When is the best time to visit Hurghada?",
a:"October until May offers excellent weather with warm temperatures and comfortable beach days."
},


{
q:"Are Hurghada hotels all inclusive?",
a:"Yes, many Hurghada resorts offer all-inclusive and ultra all-inclusive packages."
},


{
q:"Is Hurghada good for families?",
a:"Yes. Hurghada offers family resorts, water parks, beaches and activities for all ages."
}


].map((faq)=>(



<motion.div

key={faq.q}

whileHover={{
x:10
}}

className="
rounded-3xl
bg-neutral-950
p-8
"

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

className="
relative
bg-cover
bg-center
py-44
"

style={{

backgroundImage:
"url('/images/destinations/egypt/footer.jpg')"

}}

>


<div className="
absolute
inset-0
bg-black/70
"/>



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

className="
relative
mx-auto
max-w-5xl
px-6
text-center
"

>


<h2 className="
text-5xl
font-black
md:text-7xl
">

Ready For Hurghada?

</h2>




<p className="
mx-auto
mt-8
max-w-3xl
text-xl
leading-9
text-gray-300
">

Let Kushtrimi NM Worldwide create your
perfect Egypt holiday with luxury resorts,
flights, transfers and complete travel support.

</p>





<motion.a

whileHover={{
scale:1.08
}}

href="https://wa.me/38349833888?text=Hello!%20I'm%20interested%20in%20Egypt."

target="_blank"

className="
mt-10
inline-block
rounded-full
bg-orange-600
px-12
py-5
font-semibold
shadow-xl
shadow-orange-600/30
"

>

Request Your Offer

</motion.a>



</motion.div>


</section>





</main>

);

}