// Frequently asked questions. To add one, copy a block.
// - q / a: the question and the answer, in both languages
// - keywords: extra words (any language, no capital letters needed) that help the search find it
export type Both = { sq: string; en: string };
export type Faq = { q: Both; a: Both; keywords: string };

export const faqs: Faq[] = [
  {
    q: { sq: "A janë çmimet e publikuara ende valide?", en: "Are the published prices still valid?" },
    a: {
      sq: "Çmimet dhe vendet në ofertat tona varen nga disponueshmëria në momentin e rezervimit. Për këtë arsye, ju rekomandojmë të na kontaktoni për konfirmimin e çmimit aktual.",
      en: "Prices and seats in our offers depend on availability at the time of booking. For this reason we recommend contacting us to confirm the current price.",
    },
    keywords: "cmim cmimet valid vlefshme aktual price prices valid current vende disponueshmeri availability",
  },
  {
    q: { sq: "A mund të rezervoj një ofertë për më shumë persona?", en: "Can I book an offer for more people?" },
    a: {
      sq: "Po! Mund të organizojmë udhëtime për çifte, familje dhe grupe. Na tregoni numrin e udhëtarëve dhe do t'ju propozojmë alternativat më të përshtatshme.",
      en: "Yes! We can organise trips for couples, families and groups. Tell us the number of travellers and we will suggest the most suitable options.",
    },
    keywords: "persona grup grupe familje cifte group family couples people more shume",
  },
  {
    q: { sq: "A mund të rezervoj vetëm hotelin pa biletë avioni?", en: "Can I book only the hotel without a flight ticket?" },
    a: {
      sq: "Po! Përmes nesh mund të rezervoni vetëm hotelin, vetëm biletën e avionit ose një paketë të kompletuar udhëtimi.",
      en: "Yes! Through us you can book only the hotel, only the flight ticket or a complete travel package.",
    },
    keywords: "hotel vetem bileta avion flight ticket only paketa package",
  },
  {
    q: { sq: "A mund të zgjedh hotel tjetër nga ai që është në ofertë?", en: "Can I choose a different hotel from the one in the offer?" },
    a: {
      sq: "Po! Mund t'ju ofrojmë edhe hotele të tjera sipas buxhetit, lokacionit dhe preferencave tuaja.",
      en: "Yes! We can also offer other hotels according to your budget, location and preferences.",
    },
    keywords: "hotel tjeter ndryshoj zgjedh buxhet other different change choose budget",
  },
  {
    q: { sq: "A mund të ndryshoj datat e ofertës?", en: "Can I change the dates of the offer?" },
    a: {
      sq: "Po, mund të kontrollojmë data të tjera udhëtimi. Çmimi dhe disponueshmëria mund të ndryshojnë sipas datave të zgjedhura.",
      en: "Yes, we can check other travel dates. The price and availability may change depending on the dates you choose.",
    },
    keywords: "data datat ndryshoj dates change date tjera other",
  },
  {
    q: { sq: "Si mund të bëj një rezervim?", en: "How can I make a booking?" },
    a: {
      sq: "Mjafton të na kontaktoni përmes Instagramit, Facebook-ut, WhatsApp-it ose në zyrën tonë. Stafi ynë do t'ju ndihmojë gjatë gjithë procesit të rezervimit.",
      en: "Just contact us through Instagram, Facebook, WhatsApp or at our office. Our staff will help you through the whole booking process.",
    },
    keywords: "rezervim rezervoj rezervo book booking reserve si how kontakt zyra office",
  },
  {
    q: { sq: "A përfshihet bagazhi në çmimin e ofertës?", en: "Is baggage included in the price of the offer?" },
    a: {
      sq: "Bagazhi i përfshirë varet nga kompania ajrore dhe lloji i biletës. Në secilën ofertë specifikojmë çfarë bagazhi përfshihet.",
      en: "The baggage included depends on the airline and the type of ticket. In each offer we specify which baggage is included.",
    },
    keywords: "bagazh bagazhi valixhe baggage luggage suitcase bag cante",
  },
  {
    q: { sq: "A mund të shtoj bagazh shtesë?", en: "Can I add extra baggage?" },
    a: {
      sq: "Po! Mund të kërkojmë shtimin e bagazhit shtesë, sipas kushteve dhe tarifave të kompanisë ajrore.",
      en: "Yes! We can request extra baggage, according to the airline's conditions and fees.",
    },
    keywords: "bagazh shtese extra baggage luggage valixhe checked",
  },
  {
    q: { sq: "A mund të zgjedh ulësen në avion?", en: "Can I choose my seat on the plane?" },
    a: {
      sq: "Po! Zgjedhja e ulëses mund të bëhet gjatë rezervimit ose check-in-it, varësisht nga kompania ajrore. Në disa raste aplikohet pagesë shtesë.",
      en: "Yes! Seat selection can be done during booking or check-in, depending on the airline. In some cases an extra fee applies.",
    },
    keywords: "ulese ulesja seat avion plane zgjedh choose",
  },
  {
    q: { sq: "A duhet të bëj check-in online?", en: "Do I need to check in online?" },
    a: {
      sq: "Varet nga kompania ajrore. Ne ju informojmë për procedurën e check-in-it dhe ju ndihmojmë me udhëzimet përkatëse.",
      en: "It depends on the airline. We inform you about the check-in procedure and help you with the instructions.",
    },
    keywords: "check-in checkin online biletat boarding pass",
  },
  {
    q: { sq: "A mund të udhëtoj vetëm me letërnjoftim?", en: "Can I travel with only an ID card?" },
    a: {
      sq: "Dokumentet e nevojshme varen nga destinacioni, shtetësia dhe statusi i qëndrimit të udhëtarit. Ju rekomandojmë të verifikoni dokumentet para rezervimit.",
      en: "The documents you need depend on the destination, your nationality and your residence status. We recommend checking your documents before booking.",
    },
    keywords: "letërnjoftim letërnjoftimi leternjoftim id card pasaporte passport dokumente documents viza visa",
  },
  {
    q: { sq: "A mund të marr fëmijët në udhëtim?", en: "Can I take my children on the trip?" },
    a: {
      sq: "Po! Mund të organizojmë udhëtime për familje me fëmijë. Na tregoni moshat e fëmijëve që të kontrollojmë çmimet dhe kushtet përkatëse.",
      en: "Yes! We can organise trips for families with children. Tell us the children's ages so we can check the prices and conditions.",
    },
    keywords: "femije femijet moshe children kids child age familje family",
  },
  {
    q: { sq: "Çfarë përfshihet në çmimin e ofertës?", en: "What is included in the price of the offer?" },
    a: {
      sq: "Në varësi të ofertës, çmimi mund të përfshijë biletën e avionit vajtje-ardhje, akomodimin, taksat aeroportuale dhe bagazhin e specifikuar. Të gjitha detajet paraqiten në ofertën përkatëse.",
      en: "Depending on the offer, the price may include the return flight ticket, accommodation, airport taxes and the baggage specified. All the details are shown in the offer itself.",
    },
    keywords: "perfshihet perfshin cmim included includes price taksa taxes",
  },
  {
    q: { sq: "Çfarë do të thotë Room Only?", en: "What does Room Only mean?" },
    a: {
      sq: "Room Only do të thotë që rezervimi përfshin vetëm akomodimin, pa mëngjes apo shujta të tjera.",
      en: "Room Only means the booking includes only the accommodation, with no breakfast or other meals.",
    },
    keywords: "room only vetem dhome akomodim ro",
  },
  {
    q: { sq: "Çfarë do të thotë Bed & Breakfast?", en: "What does Bed & Breakfast mean?" },
    a: {
      sq: "Bed & Breakfast përfshin akomodimin dhe mëngjesin në hotel.",
      en: "Bed & Breakfast includes the accommodation and breakfast at the hotel.",
    },
    keywords: "bed breakfast bb mengjes breakfast",
  },
  {
    q: { sq: "Çfarë do të thotë All Inclusive?", en: "What does All Inclusive mean?" },
    a: {
      sq: "All Inclusive zakonisht përfshin akomodimin, ushqimet kryesore, pijet dhe disa shërbime të tjera të hotelit, sipas konceptit dhe kushteve të hotelit.",
      en: "All Inclusive usually includes accommodation, the main meals, drinks and some other hotel services, according to the hotel's concept and conditions.",
    },
    keywords: "all inclusive ai ultra ushqim pije food drinks",
  },
  {
    q: { sq: "A përfshihet transporti nga aeroporti deri në hotel?", en: "Is the transfer from the airport to the hotel included?" },
    a: {
      sq: "Transporti nuk përfshihet në çdo ofertë. Nëse nuk është i specifikuar, mund t'ju ndihmojmë ta organizoni me pagesë shtesë.",
      en: "The transfer is not included in every offer. If it is not specified, we can help you organise it for an extra fee.",
    },
    keywords: "transport transfer transferte aeroport airport hotel taksi taxi",
  },
  {
    q: { sq: "A mund të rezervoj pushime All Inclusive?", en: "Can I book an All Inclusive holiday?" },
    a: {
      sq: "Po! Ofrojmë paketa All Inclusive në destinacione të ndryshme, si Turqia, Egjipti, Greqia dhe destinacione të tjera.",
      en: "Yes! We offer All Inclusive packages in different destinations, such as Turkey, Egypt, Greece and others.",
    },
    keywords: "all inclusive pushime turqi egjipt greqi turkey egypt greece holiday",
  },
  {
    q: { sq: "Si mund të bëj pagesën?", en: "How can I pay?" },
    a: {
      sq: "Pagesa mund të realizohet përmes mënyrave të pagesës që ofrojmë në zyrën tonë. Për informata më të hollësishme, ju lutemi na kontaktoni.",
      en: "Payment can be made using the payment methods we offer at our office. For more detailed information, please contact us.",
    },
    keywords: "pagesa pagese paguaj paguaj payment pay card cash kartele",
  },
  {
    q: { sq: "A mund të paguaj me këste?", en: "Can I pay in instalments?" },
    a: {
      sq: "Mundësia e pagesës me këste varet nga lloji i rezervimit dhe kushtet e dakorduara paraprakisht me agjencinë.",
      en: "The option to pay in instalments depends on the type of booking and the conditions agreed in advance with the agency.",
    },
    keywords: "keste kest instalments installments pagese payment",
  },
  {
    q: { sq: "A marr konfirmim pas rezervimit?", en: "Will I get a confirmation after booking?" },
    a: {
      sq: "Po! Pas përfundimit të rezervimit, ju dërgojmë dokumentet dhe konfirmimet përkatëse, si biletën e avionit, voucher-in e hotelit dhe dokumentet e tjera sipas shërbimit të rezervuar.",
      en: "Yes! After the booking is completed we send you the documents and confirmations, such as the flight ticket, the hotel voucher and other documents depending on the service booked.",
    },
    keywords: "konfirmim voucher bileta dokumente confirmation ticket documents",
  },
  {
    q: { sq: "A mund ta anuloj rezervimin dhe të marr paratë mbrapsht?", en: "Can I cancel my booking and get my money back?" },
    a: {
      sq: "Kushtet e anulimit dhe rimbursimit varen nga kompania ajrore, hoteli dhe tarifa e rezervuar. Para pagesës mund t'ju informojmë për kushtet konkrete të rezervimit tuaj.",
      en: "The cancellation and refund conditions depend on the airline, the hotel and the fare booked. Before payment we can inform you of the specific conditions of your booking.",
    },
    keywords: "anulim anuloj anulo rimbursim para mbrapsht cancel refund money back",
  },
];