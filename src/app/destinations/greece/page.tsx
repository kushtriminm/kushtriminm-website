"use client";

import { motion } from "framer-motion";
import Counter from "@/components/animations/Counter";


export default function GreecePage() {


const destinations = [


{
name:"Santorini",
image:"/images/destinations/greece/santorini.jpg",
description:
"White villages, blue domes and unforgettable sunsets in the Aegean Sea.",
link:"/destinations/greece/santorini"
},


{
name:"Mykonos",
image:"/images/destinations/greece/mykonos.jpg",
description:
"Luxury beaches, nightlife and exclusive Mediterranean experiences.",
link:"/destinations/greece/mykonos"
},


{
name:"Halkidiki",
image:"/images/destinations/greece/halkidiki.jpg",
description:
"Crystal-clear beaches, family resorts and comfortable bus transportation.",
link:"/destinations/greece/halkidiki"
},


{
name:"Crete",
image:"/images/destinations/greece/crete.jpg",
description:
"Ancient history, beautiful beaches and authentic Greek culture.",
link:"/destinations/greece/crete"
}


];



return (


<main className="
destination-greece
overflow-hidden
bg-black
text-white
">





{/* HERO */}



<section className="
relative
flex
h-screen
items-center
justify-center
overflow-hidden
">



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

src="/images/destinations/greece/hero.jpg"

alt="Greece"

className="
absolute
inset-0
h-full
w-full
object-cover
"

/>



<div className="
absolute
inset-0
bg-black/60
"/>






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

className="
relative
z-10
max-w-5xl
px-6
text-center
"

>





<h1 className="
text-7xl
font-black
leading-[0.9]
md:text-8xl
">

GREECE

</h1>





<p className="
mx-auto
mt-8
max-w-3xl
text-xl
text-gray-200
">

Beautiful islands, luxury resorts and
unforgettable Mediterranean experiences.

</p>





<div className="
mt-10
flex
flex-col
justify-center
gap-5
sm:flex-row
">



<motion.a

whileHover={{
scale:1.05
}}

href="https://wa.me/38349833888"

target="_blank"

className="
rounded-full
bg-blue-600
px-10
py-4
font-semibold
text-white
"

>

Request Your Offer

</motion.a>




<motion.a

whileHover={{
scale:1.05
}}

href="#destinations"

className="
rounded-full
border
border-white/30
px-10
py-4
font-semibold
backdrop-blur
"

>

Discover Greece

</motion.a>



</div>



</motion.div>



</section>







{/* FLOATING MENU */}

<section className="relative z-30 -mt-10">

<div className="mx-auto flex max-w-fit rounded-full border border-white/10 bg-black/70 px-8 py-4 shadow-2xl backdrop-blur-xl">

<div className="flex gap-8 text-sm text-gray-200">

<a href="#destinations">
Destinations
</a>


<a href="#why">
Why Greece
</a>


<a href="#faq">
FAQ
</a>


</div>

</div>

</section>





{/* QUICK FACTS */}

<section className="border-b border-neutral-800 bg-neutral-950 py-24">


<div className="mx-auto grid max-w-6xl grid-cols-2 gap-12 px-6 md:grid-cols-4">



{[

{
number:120,
suffix:"+",
text:"Greek Islands"
},


{
number:500,
suffix:"+",
text:"Luxury Hotels"
},


{
number:300,
suffix:"+",
text:"Sunny Days"
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


<h3 className="text-5xl font-black text-blue-500 md:text-6xl">


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

{/* DESTINATIONS */}


<section
id="destinations"
className="
mx-auto
max-w-7xl
px-6
py-32
"
>



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

className="
mb-16
text-center
"

>


<p className="
uppercase
tracking-[0.4em]
text-blue-400
">

Explore Greece

</p>



<h2 className="
mt-5
text-5xl
font-black
">

Choose Your Destination

</h2>



<p className="
mx-auto
mt-6
max-w-3xl
text-gray-400
">

Discover Greece's most iconic islands and
coastal escapes designed for unforgettable holidays.

</p>


</motion.div>






<div className="
grid
gap-10
md:grid-cols-2
">





{destinations.map((destination,index)=>(



<motion.div


key={destination.name}


initial={{
opacity:0,
y:60
}}


whileInView={{
opacity:1,
y:0
}}


viewport={{
once:true
}}



transition={{
delay:index*.15
}}



whileHover={{
y:-12
}}



className="
group
relative
h-[600px]
overflow-hidden
rounded-[40px]
border
border-white/5
bg-neutral-900
shadow-2xl
"



>



<img

src={destination.image}

alt={destination.name}

className="
absolute
inset-0
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
via-black/40
to-transparent
"/>






<div className="
absolute
bottom-0
p-10
">



<div className="
mb-4
inline-block
rounded-full
bg-blue-600/20
px-4
py-2
text-sm
uppercase
tracking-widest
text-blue-300
">

Greece

</div>





<h3 className="
text-5xl
font-black
">

{destination.name}

</h3>





<p className="
mt-5
max-w-md
text-lg
leading-8
text-gray-300
">

{destination.description}

</p>






<motion.a

whileHover={{
scale:1.05
}}


href={destination.link}


className="
mt-8
inline-block
rounded-full
bg-blue-600
px-8
py-4
font-semibold
hover:bg-blue-700
"

>

Explore {destination.name}

</motion.a>





</div>






</motion.div>



))}



</div>



</section>







{/* WHY GREECE */}


<section
id="why"
className="
bg-neutral-950
py-32
"
>


<div className="
mx-auto
max-w-7xl
px-6
">



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

className="
mb-16
text-center
"

>


<p className="
uppercase
tracking-[0.3em]
text-blue-400
">

Why Choose Us

</p>



<h2 className="
mt-5
text-5xl
font-black
">

Your Greece Holiday Made Easy

</h2>


</motion.div>





<div className="
grid
gap-6
md:grid-cols-4
">



{[

{
icon:"🏨",
title:"Handpicked Hotels",
text:"Luxury resorts and comfortable stays."
},


{
icon:"✈️",
title:"Flight Packages",
text:"Complete holiday planning from start to finish."
},


{
icon:"🚌",
title:"Halkidiki Transport",
text:"Easy organized transportation options."
},


{
icon:"🛡️",
title:"24/7 Support",
text:"Travel assistance whenever you need it."
}


].map((item,index)=>(


<motion.div

key={index}

whileHover={{
y:-10
}}

className="
rounded-[30px]
border
border-neutral-800
bg-black
p-8
"


>


<div className="
text-4xl
">

{item.icon}

</div>



<h3 className="
mt-6
text-xl
font-bold
">

{item.title}

</h3>



<p className="
mt-3
text-gray-400
">

{item.text}

</p>



</motion.div>


))}



</div>



</div>


</section>

{/* FAQ */}


<section

id="faq"

className="
py-32
"

>


<div className="
mx-auto
max-w-5xl
px-6
">





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

className="
mb-16
text-center
"

>


<p className="
uppercase
tracking-[0.3em]
text-blue-400
">

Need To Know

</p>





<h2 className="
mt-5
text-5xl
font-black
">

Frequently Asked Questions

</h2>



</motion.div>







<div className="
space-y-6
">



{[

{
q:"What are the best places to visit in Greece?",
a:"Santorini, Mykonos, Halkidiki and Crete are some of Greece's most popular destinations for beaches, luxury hotels and unforgettable experiences."
},


{
q:"Is Greece suitable for families?",
a:"Yes. Greece offers many family-friendly resorts, calm beaches and activities for children and adults."
},


{
q:"Can you arrange flights and hotels?",
a:"Yes. Kushtrimi NM Worldwide can organize complete holiday packages including flights, accommodation and travel support."
},


{
q:"When is the best time to visit Greece?",
a:"Spring, early summer and autumn offer excellent weather with fewer crowds and comfortable temperatures."
}


].map((faq,index)=>(



<motion.div


key={faq.q}


initial={{
opacity:0,
x:-40
}}


whileInView={{
opacity:1,
x:0
}}


viewport={{
once:true
}}


transition={{
delay:index*0.1
}}


whileHover={{
x:10
}}



className="
rounded-3xl
border
border-neutral-900
bg-neutral-950
p-8
"

>



<h3 className="
text-xl
font-bold
">

{faq.q}

</h3>





<p className="
mt-3
leading-7
text-gray-400
">

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

"url('/images/destinations/greece/footer.jpg')"


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



<p className="
uppercase
tracking-[0.4em]
text-blue-400
">

Kushtrimi NM Worldwide

</p>






<h2 className="
mt-6
text-5xl
font-black
md:text-7xl
">

Ready For Greece?

</h2>






<p className="
mx-auto
mt-8
max-w-3xl
text-xl
leading-9
text-gray-300
">


Let us create your perfect Greek holiday
with luxury hotels, flights, transfers and
complete travel support.



</p>








<motion.a


whileHover={{
scale:1.08
}}


href="https://wa.me/38349833888?text=Hello!%20I'm%20interested%20in%20Greece."


target="_blank"


rel="noopener noreferrer"



className="
mt-10
inline-block
rounded-full
bg-blue-600
px-12
py-5
font-semibold
shadow-xl
shadow-blue-600/30
hover:bg-blue-700
"


>


Request Your Offer


</motion.a>





</motion.div>





</section>






</main>


);

}