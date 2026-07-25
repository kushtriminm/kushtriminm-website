import Image from "next/image";
import { MapPin, Star } from "lucide-react";


const destinations = [
  {
    name: "Antalya",
    country: "Turkey",
    price: "From €399",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    badge: "POPULAR",
    description: "5★ resorts, all inclusive holidays & crystal beaches",
  },

  {
    name: "Egypt",
    country: "Egypt",
    price: "From €499",
    image:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1200",
    badge: "HOT",
    description: "Red Sea resorts, diving & unforgettable experiences",
  },

  {
    name: "Greece",
    country: "Greece",
    price: "From €349",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200",
    badge: "BEST SELLER",
    description: "Island escapes, beaches & Mediterranean beauty",
  },

  {
    name: "Dubai",
    country: "UAE",
    price: "From €699",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
    badge: "LUXURY",
    description: "Luxury hotels, skyline views & desert adventures",
  },

  {
    name: "Maldives",
    country: "Maldives",
    price: "From €1199",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200",
    badge: "PARADISE",
    description: "Private villas, turquoise waters & pure relaxation",
  },

  {
    name: "Italy",
    country: "Italy",
    price: "From €449",
    image:
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1200",
    badge: "CITY BREAK",
    description: "Rome, Milan, Venice & Lake Como escapes",
  },
];


export default function DestinationCards() {

  return (

    <section id="offers" className="bg-black py-28">


      <div className="mx-auto max-w-7xl px-6">



        {/* TITLE */}

        <div className="mb-16 text-center">

          <p className="font-semibold uppercase tracking-[0.4em] text-red-500">
            Our Destinations
          </p>


          <h2 className="mt-4 text-5xl font-black text-white">
            Explore The World
          </h2>


          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Discover handpicked destinations with premium hotels,
            personalized service and unforgettable experiences.
          </p>


        </div>





        {/* CARDS */}


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {destinations.map((destination) => (


            <div
              key={destination.name}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-red-500/40 hover:shadow-[0_25px_80px_rgba(220,38,38,0.25)]"
            >



              {/* IMAGE */}


              <div className="relative h-80 overflow-hidden">


                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />



                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />




                {/* BADGE */}


                <div className="absolute left-5 top-5 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">

                  {destination.badge}

                </div>





                {/* NAME */}


                <div className="absolute bottom-6 left-6 right-6">


                  <h3 className="text-4xl font-black text-white">

                    {destination.name}

                  </h3>



                  <p className="mt-2 text-gray-200">

                    {destination.description}

                  </p>


                </div>



              </div>







              {/* CONTENT */}


              <div className="p-8">





                <div className="flex items-center gap-2 text-yellow-400">


                  <Star className="h-5 w-5 fill-yellow-400" />

                  <Star className="h-5 w-5 fill-yellow-400" />

                  <Star className="h-5 w-5 fill-yellow-400" />

                  <Star className="h-5 w-5 fill-yellow-400" />

                  <Star className="h-5 w-5 fill-yellow-400" />


                  <span className="ml-2 text-sm text-gray-400">
                    Premium Hotels
                  </span>


                </div>





                {/* LOCATION */}


                <div className="mt-4 flex items-center gap-2 text-gray-400">


                  <MapPin className="h-5 w-5 text-red-500" />


                  <span>
                    {destination.country}
                  </span>


                </div>






                <p className="mt-6 text-4xl font-black text-red-500">

                  {destination.price}

                </p>






                <a
                  href={`https://wa.me/38349833888?text=Hello! I'm interested in ${destination.name}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full bg-red-600 py-4 font-semibold text-white transition duration-300 hover:bg-red-700"
                >

                  Explore Destination

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>


                </a>



              </div>



            </div>


          ))}


        </div>


      </div>


    </section>

  );
}