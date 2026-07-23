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

]


return (

<main className="bg-black text-white">


{/* HERO */}

<section className="relative h-screen flex items-center justify-center">


<img
src="/images/destinations/greece/hero.jpg"
className="absolute inset-0 h-full w-full object-cover"
/>


<div className="absolute inset-0 bg-black/60"/>


<div className="relative z-10 text-center px-6">


<p className="uppercase tracking-[0.4em] text-red-500">
Kushtrimi NM Worldwide
</p>


<h1 className="mt-5 text-7xl font-black">
Greece
</h1>


<p className="mt-8 max-w-3xl text-xl text-gray-200">
Discover Greece's most beautiful islands and coastal destinations.
Luxury hotels, family holidays and unforgettable Mediterranean experiences.
</p>


</div>

</section>





{/* DESTINATIONS */}

<section className="mx-auto max-w-7xl px-6 py-28">


  <div className="mb-16 text-center">

    <p className="uppercase tracking-[0.3em] text-red-500">
      Explore Greece
    </p>

    <h2 className="mt-4 text-5xl font-black">
      Choose Your Destination
    </h2>

  </div>



  <div className="grid gap-10 md:grid-cols-2">


    {/* SANTORINI */}

    <div className="overflow-hidden rounded-3xl bg-neutral-900">

      <img
        src="/images/destinations/greece/santorini.jpg"
        alt="Santorini"
        className="h-96 w-full object-cover transition duration-500 hover:scale-110"
      />


      <div className="p-8">

        <h3 className="text-4xl font-bold">
          Santorini
        </h3>


        <p className="mt-5 leading-8 text-gray-300">
          White villages, blue domes and unforgettable sunsets
          in one of Greece's most beautiful islands.
        </p>


        <a
          href="https://wa.me/38349833888?text=Hello! I'm interested in Santorini Greece holiday."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:scale-105 hover:bg-red-700"
        >
          Explore Santorini
        </a>

      </div>

    </div>





    {/* MYKONOS */}

    <div className="overflow-hidden rounded-3xl bg-neutral-900">

      <img
        src="/images/destinations/greece/mykonos.jpg"
        alt="Mykonos"
        className="h-96 w-full object-cover transition duration-500 hover:scale-110"
      />


      <div className="p-8">

        <h3 className="text-4xl font-bold">
          Mykonos
        </h3>


        <p className="mt-5 leading-8 text-gray-300">
          Luxury beaches, famous nightlife and exclusive
          Mediterranean experiences.
        </p>


        <a
          href="https://wa.me/38349833888?text=Hello! I'm interested in Mykonos Greece holiday."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:scale-105 hover:bg-red-700"
        >
          Explore Mykonos
        </a>

      </div>

    </div>






    {/* HALKIDIKI */}

    <div className="overflow-hidden rounded-3xl bg-neutral-900">

      <img
        src="/images/destinations/greece/halkidiki.jpg"
        alt="Halkidiki"
        className="h-96 w-full object-cover transition duration-500 hover:scale-110"
      />


      <div className="p-8">

        <h3 className="text-4xl font-bold">
          Halkidiki
        </h3>


        <p className="mt-5 leading-8 text-gray-300">
          Crystal-clear beaches, family resorts and organized
          bus transportation for an easy holiday experience.
        </p>


        <div className="mt-5 flex flex-wrap gap-2">

          <span className="rounded-full bg-black px-3 py-2 text-sm">
            🚌 Bus Transport
          </span>

          <span className="rounded-full bg-black px-3 py-2 text-sm">
            🏨 Hotels
          </span>

          <span className="rounded-full bg-black px-3 py-2 text-sm">
            🌊 Beaches
          </span>

        </div>


        <a
          href="https://wa.me/38349833888?text=Hello! I'm interested in Halkidiki Greece holiday with bus transportation."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold transition hover:scale-105 hover:bg-red-700"
        >
          Explore Halkidiki
        </a>

      </div>

    </div>







    {/* CRETE */}

    <div className="overflow-hidden rounded-3xl bg-neutral-900">

      <img
        src="/images/destinations/greece/crete.jpg"
        alt="Crete"
        className="h-96 w-full object-cover transition duration-500 hover:scale-110"
      />


      <div className="p-8">

        <h3 className="text-4xl font-bold">
          Crete
        </h3>


        <p className="mt-5 leading-8 text-gray-300">
          Ancient history, beautiful beaches and authentic
          Greek culture combined with luxury stays.
        </p>


        <a
          href="https://wa.me/38349833888?text=Hello! I'm interested in Crete Greece holiday."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-full bg-red-600 px-8 px-8 py-3 font-semibold transition hover:scale-105 hover:bg-red-700"
        >
          Explore Crete
        </a>

      </div>

    </div>


  </div>


</section>






{/* WHY BOOK */}


<section className="bg-neutral-950 py-28">


<div className="mx-auto max-w-7xl px-6">


<h2 className="text-center text-5xl font-black mb-16">
Why Greece With Us?
</h2>



<div className="grid gap-6 md:grid-cols-4">


<div className="rounded-3xl bg-black p-8">
🏨 Handpicked Hotels
</div>


<div className="rounded-3xl bg-black p-8">
✈️ Flight Packages
</div>


<div className="rounded-3xl bg-black p-8">
🚌 Halkidiki Bus Transport
</div>


<div className="rounded-3xl bg-black p-8">
🛡 24/7 Assistance
</div>


</div>


</div>


</section>




<section
className="relative py-40 bg-cover bg-center"
style={{
backgroundImage:
"url('/images/destinations/greece/footer.jpg')"
}}
>


<div className="absolute inset-0 bg-black/70"/>


<div className="relative text-center px-6">


<h2 className="text-6xl font-black">
Ready For Greece?
</h2>


<p className="mt-8 text-xl text-gray-300">
Contact Kushtrimi NM Worldwide and receive your personalized Greece offer.
</p>


<a
href="https://wa.me/38349833888?text=Hello! I'm interested in Greece."
className="mt-10 inline-block rounded-full bg-red-600 px-10 py-4"
>
Request Offer
</a>


</div>


</section>


</main>

)

}