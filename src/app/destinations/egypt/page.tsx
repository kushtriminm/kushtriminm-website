export default function EgyptPage() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}

      <section className="relative flex h-screen items-center justify-center overflow-hidden">

        <img
          src="/images/destinations/egypt/hero.jpg"
          alt="Egypt Hurghada"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-4xl px-6 text-center">

          <p className="mb-4 uppercase tracking-[0.4em] text-red-500">
            Kushtrimi NM Worldwide
          </p>

          <h1 className="text-6xl font-black md:text-8xl">
            Egypt
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-gray-200">
            Discover Hurghada, crystal-clear waters, luxury resorts
            and unforgettable Red Sea holidays.
          </p>


          <a
            href="https://wa.me/38349833888"
            target="_blank"
            className="mt-12 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold transition hover:scale-105 hover:bg-red-700"
          >
            Request Your Offer
          </a>

        </div>

      </section>



      {/* ABOUT */}

      <section className="mx-auto max-w-7xl px-6 py-28">

        <div className="grid items-center gap-16 lg:grid-cols-2">


          <div>

            <img
              src="/images/destinations/egypt/about.jpg"
              alt="Hurghada"
              className="h-[520px] w-full rounded-[32px] border-4 border-red-500 object-cover shadow-2xl"
            />

          </div>



          <div>

            <p className="uppercase tracking-[0.3em] text-red-500">
              Discover Hurghada
            </p>


            <h2 className="mt-4 text-5xl font-black">
              Why Visit Egypt?
            </h2>


            <p className="mt-8 text-lg leading-9 text-gray-300">
              Hurghada is one of Egypt's most popular holiday destinations,
              offering luxury all-inclusive resorts, beautiful beaches,
              incredible coral reefs and unforgettable Red Sea adventures.
            </p>



            <div className="mt-10 grid grid-cols-2 gap-4">


              <div className="rounded-2xl bg-neutral-900 p-5">
                🌊 Red Sea Beaches
              </div>


              <div className="rounded-2xl bg-neutral-900 p-5">
                🏨 Luxury Resorts
              </div>


              <div className="rounded-2xl bg-neutral-900 p-5">
                🤿 Snorkeling & Diving
              </div>


              <div className="rounded-2xl bg-neutral-900 p-5">
                ☀️ Year Round Sun
              </div>


            </div>

          </div>


        </div>


      </section>





      {/* HOTELS */}

      <section className="mx-auto max-w-7xl px-6 py-28">


        <div className="mb-16 text-center">

          <p className="uppercase tracking-[0.3em] text-red-500">
            Luxury Collection
          </p>


          <h2 className="mt-4 text-5xl font-black">
            Top Hurghada Hotels
          </h2>

        </div>



        <div className="grid gap-10 lg:grid-cols-3">



          {/* SERRY BEACH */}

         <HotelCard
  image="/images/destinations/egypt/serry.jpg"
  name="Serry Beach Resort"
  location="Hurghada, Egypt"
  description="A luxury beachfront resort with elegant rooms, private beach, excellent restaurants and premium Red Sea experience."
  tags={[
    "Private Beach",
    "All Inclusive",
    "Spa",
    "Luxury"
  ]}
/>


          {/* STEIGENBERGER */}

          <HotelCard
            image="/images/destinations/egypt/steigenberger.jpg"
            name="Steigenberger ALDAU Beach Hotel"
            location="Hurghada, Egypt"
            description="One of Hurghada's finest resorts offering golf, wellness facilities, beautiful pools and exceptional service."
            tags={[
              "5 Star",
              "Golf",
              "Beach",
              "Spa"
            ]}
          />



          {/* DESERT ROSE */}

          <HotelCard
            image="/images/destinations/egypt/desertrose.jpg"
            name="Desert Rose Resort"
            location="Hurghada, Egypt"
            description="A family-friendly all-inclusive resort with lagoons, restaurants, activities and a private beach."
            tags={[
              "Family",
              "All Inclusive",
              "Pools",
              "Beach"
            ]}
          />



        </div>


      </section>






      {/* INCLUDED */}


      <section className="bg-neutral-950 py-28">


        <div className="mx-auto max-w-7xl px-6">


          <h2 className="mb-16 text-center text-5xl font-black">
            What's Included
          </h2>


          <div className="grid gap-6 md:grid-cols-3">


            <div className="rounded-3xl bg-black p-8">
              ✈️ Flights
            </div>


            <div className="rounded-3xl bg-black p-8">
              🏨 Hotel Accommodation
            </div>


            <div className="rounded-3xl bg-black p-8">
              🚐 Airport Transfers
            </div>


            <div className="rounded-3xl bg-black p-8">
              🍽 All Inclusive Packages
            </div>


            <div className="rounded-3xl bg-black p-8">
              🛡 24/7 Assistance
            </div>


            <div className="rounded-3xl bg-black p-8">
              📞 Travel Support
            </div>


          </div>


        </div>


      </section>






      {/* CTA */}


      <section
        className="relative py-40 bg-cover bg-center"
        style={{
          backgroundImage:
          "url('/images/destinations/egypt/footer.jpg')"
        }}
      >


        <div className="absolute inset-0 bg-black/70"/>


        <div className="relative mx-auto max-w-5xl px-6 text-center">


          <h2 className="text-5xl font-black md:text-6xl">
            Ready For Egypt?
          </h2>


          <p className="mt-8 text-xl leading-9 text-gray-300">
            Let Kushtrimi NM Worldwide create your perfect Red Sea holiday.
            Contact us today and receive your personalized offer.
          </p>


          <a
            href="https://wa.me/38349833888?text=Hello! I'm interested in Egypt."
            target="_blank"
            className="mt-10 inline-block rounded-full bg-red-600 px-10 py-4 font-semibold hover:bg-red-700"
          >
            Request Your Offer
          </a>


        </div>


      </section>


    </main>
  );
}





function HotelCard({
  image,
  name,
  location,
  description,
  tags
}:{
  image:string;
  name:string;
  location:string;
  description:string;
  tags:string[];
}){

return (

<div className="overflow-hidden rounded-3xl bg-neutral-900 transition hover:-translate-y-3">


<img
src={image}
alt={name}
className="h-72 w-full object-cover"
/>


<div className="p-8">


<p className="text-lg text-yellow-400">
★★★★★
</p>


<h3 className="mt-3 text-3xl font-bold">
{name}
</h3>


<p className="mt-2 text-gray-400">
📍 {location}
</p>


<p className="mt-5 leading-8 text-gray-300">
{description}
</p>



<div className="mt-6 flex flex-wrap gap-2">

{tags.map((tag)=>(
<span
key={tag}
className="rounded-full bg-black px-3 py-2 text-sm"
>
{tag}
</span>
))}


</div>



<a
href="https://wa.me/38349833888"
target="_blank"
className="mt-8 inline-block rounded-full bg-red-600 px-8 py-3 font-semibold hover:bg-red-700"
>
View Offer
</a>


</div>


</div>

)

}