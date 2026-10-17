/* =========================================================
   AURAMIND — SITE LOGIC
   One file, no build step, no dependencies. Works on every page
   (index.html, pricing.html, 404.html) and from file:// too.

   - EN / TR / AR translations (+ Arabic RTL)
   - Language detection, ?lang= override, localStorage persistence
   - Mobile navigation, scroll-aware navbar, active-section link
   - Scroll-reveal that never hides content if something fails
   - Offscreen animation / video pausing (battery + CPU)
   - Lead form → WhatsApp handoff
   - Pricing page: plan buttons open WhatsApp in the right language
========================================================= */

(() => {
    "use strict";

    /* =====================================================
       CONFIG
    ===================================================== */

    const STORAGE_KEY = "auramind_lang";
    const DEFAULT_LANG = "en";
    const SUPPORTED_LANGS = ["en", "tr", "ar"];
    const RTL_LANGS = ["ar"];
    const WHATSAPP_NUMBER = "905488630491";
    const DESKTOP_NAV_QUERY = "(min-width: 1121px)"; // must match the CSS breakpoint
    const OG_LOCALES = { en: "en_US", tr: "tr_TR", ar: "ar_AR" };

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    root.classList.add("js");


    /* =====================================================
       TRANSLATIONS
       Every data-i18n / data-i18n-placeholder key used in the
       HTML lives here. {year} is replaced automatically.
    ===================================================== */

    const translations = {
        "en": {
            "meta": {
                "description": "AuraMind builds custom AI assistants for WhatsApp, Instagram and your website that answer customers, capture leads, take orders and book appointments, 24/7.",
                "title": "AuraMind | AI Automation Agency",
                "ogDescription": "Custom AI assistants that answer customers, capture leads and take orders, 24/7."
            },
            "nav": {
                "services": "Services",
                "industries": "Industries",
                "howItWorks": "How It Works",
                "about": "About",
                "contact": "Contact",
                "bookDemo": "Book a Demo",
                "openMenu": "Open menu",
                "closeMenu": "Close menu",
                "pricing": "Pricing"
            },
            "hero": {
                "eyebrow": "AI BUSINESS AUTOMATION",
                "h1_line1": "AI that answers customers",
                "h1_line2": "so your team can focus on growth.",
                "description": "AuraMind builds custom AI systems that talk to customers, capture leads, take orders, remember conversations, and automate repetitive work — 24/7.",
                "btnPrimary": "Book a Free Demo",
                "btnSecondary": "See How It Works",
                "trustAvailability": "AI availability",
                "trustResponse": "Customer responses",
                "trustCustom": "Built for your business",
                "online": "Online",
                "previewCustomerLabel": "Customer",
                "previewCustomer": "Hi, I’d like to know if you deliver.",
                "previewAiLabel": "AuraMind AI",
                "previewAi": "Absolutely. I can help with delivery, orders, and any questions about the business.",
                "previewAction1": "Conversation understood",
                "previewAction2": "Customer information captured",
                "previewAction3": "Next action triggered",
                "floatTopTitle": "Customer captured",
                "floatTopText": "Ready for your workflow",
                "floatBottomTitle": "AI working",
                "floatBottomText": "No manual reply required",
                "trustAvailabilityValue": "24/7",
                "trustResponseValue": "Instant",
                "trustCustomValue": "Custom"
            },
            "platforms": {
                "label": "Built for the channels your customers already use"
            },
            "problem": {
                "kicker": "THE PROBLEM",
                "title": "Your customers don’t wait.",
                "description": "Every unanswered message, delayed response, and repetitive task creates friction for your business.",
                "card1Title": "Missed messages",
                "card1Text": "Customers reach out when your team is busy, offline, or unavailable.",
                "card2Title": "Slow replies",
                "card2Text": "Delayed responses can turn interested customers into lost opportunities.",
                "card3Title": "Manual work",
                "card3Text": "Your team spends valuable time answering the same questions and processing repetitive requests.",
                "card4Title": "Scattered information",
                "card4Text": "Customer conversations, leads, orders, and follow-ups can become difficult to manage manually."
            },
            "solution": {
                "coreText": "Business System",
                "item1Title": "Understand",
                "item2Title": "Remember",
                "item3Title": "Act",
                "kicker": "THE AURAMIND SYSTEM",
                "title": "More than a chatbot.",
                "description": "AuraMind connects AI conversations with the workflows your business actually needs.",
                "item1Text": "Understand customer intent and context.",
                "item2Text": "Keep relevant customer information across conversations.",
                "item3Text": "Trigger the right business workflow at the right time.",
                "item4Title": "Hand Off",
                "item4Text": "Bring your team in when human involvement is needed."
            },
            "services": {
                "kicker": "AI SOLUTIONS",
                "title": "What can we automate?",
                "description": "Custom AI systems designed around the way your business operates.",
                "card1Title": "AI Customer Support",
                "card1Text": "Answer customer questions instantly and keep conversations moving without putting more pressure on your team.",
                "learnMore": "Explore solution →",
                "card2Title": "AI Lead Capture",
                "card2Text": "Turn customer conversations into structured leads your business can actually follow up with.",
                "card3Title": "AI Ordering",
                "card3Text": "Let customers place orders through natural conversation while your business receives the information it needs.",
                "card4Title": "AI Follow-Up",
                "card4Text": "Automatically continue conversations and follow up with customers who need another touchpoint.",
                "card5Title": "AI Appointment Booking",
                "card5Text": "Handle appointment requests and help customers find the next available step without manual back-and-forth.",
                "card6Title": "Custom AI Agents",
                "card6Text": "Build an AI workflow around the specific tasks, systems, and customer interactions your business needs."
            },
            "industries": {
                "kicker": "BUILT FOR REAL BUSINESSES",
                "title": "AI that fits your industry.",
                "description": "The right automation depends on how your customers interact with your business.",
                "restaurantTitle": "Restaurants",
                "restaurantText": "Customer support, ordering, delivery information, and automated order workflows.",
                "realEstateTitle": "Real Estate",
                "realEstateText": "Capture property inquiries, qualify leads, and keep prospects moving.",
                "clinicTitle": "Clinics",
                "clinicText": "Answer common questions, manage requests, and support appointment workflows.",
                "retailTitle": "Retail & Local Business",
                "retailText": "Automate everyday customer conversations, inquiries, and repetitive tasks."
            },
            "steps": {
                "kicker": "HOW IT WORKS",
                "title": "From conversation to action.",
                "description": "AuraMind connects the customer conversation to the business action that needs to happen next.",
                "step1Title": "Customer reaches out",
                "step1Text": "A customer starts a conversation through a channel your business already uses.",
                "step2Title": "AI understands",
                "step2Text": "AuraMind understands the request and responds naturally using the information available to it.",
                "step3Title": "Information is remembered",
                "step3Text": "Relevant customer information can be stored and used in future conversations.",
                "step4Title": "Your business gets the result",
                "step4Text": "Leads are captured, orders are processed, workflows are triggered, or your team is notified."
            },
            "why": {
                "kicker": "WHY AURAMIND",
                "title": "AI that works the way your business works.",
                "description": "Your business is unique. Your automation should be too.",
                "card1Title": "Custom",
                "card1Text": "Built around your business, customers, information, and workflows.",
                "card2Title": "Always On",
                "card2Text": "Give customers a way to get answers and start conversations outside business hours.",
                "card3Title": "Connected",
                "card3Text": "Connect customer conversations to the tools and workflows your business relies on.",
                "card4Title": "Human When Needed",
                "card4Text": "Automation should support your team, not prevent human involvement when it matters."
            },
            "demo": {
                "kicker": "SEE IT IN ACTION",
                "title": "See a typical conversation.",
                "description": "A customer asks a question and the assistant replies instantly, using your business information and bringing in your team when needed.",
                "button": "Talk to AuraMind",
                "online": "Online",
                "message1": "What can you automate for my business?",
                "message2": "I can help automate customer support, lead capture, orders, appointments, follow-ups, and other repetitive workflows.",
                "suggestion1": "Customer support",
                "suggestion2": "Lead capture",
                "suggestion3": "Orders"
            },
            "contact": {
                "kicker": "LET’S TALK",
                "title": "What could your business automate?",
                "description": "Tell us a little about your business and we’ll help identify where AI can make the biggest difference.",
                "formTitle": "Start your AI automation plan.",
                "formSubtitle": "A few details are all we need to understand what you want to automate.",
                "formName": "Your name",
                "formBusiness": "Business name",
                "formType": "Business type",
                "formTypePlaceholder": "Select one",
                "typeRestaurant": "Restaurant",
                "typeRealEstate": "Real Estate",
                "typeClinic": "Clinic",
                "typeRetail": "Retail & Local Business",
                "typeOther": "Other",
                "formGoal": "What would you like to automate?",
                "formGoalPlaceholder": "Select one",
                "goalSupport": "Customer support",
                "goalLeads": "Lead capture",
                "goalOrders": "Orders",
                "goalAppointments": "Appointments",
                "goalOther": "Other",
                "formWhatsapp": "WhatsApp number",
                "formSubmit": "Request a Free Consultation",
                "formNote": "Your request will open in WhatsApp so we can respond directly.",
                "emailLabel": "Email",
                "phoneLabel": "Phone / WhatsApp",
                "locationLabel": "Location",
                "locationValue": "Lefkoşa, Northern Cyprus",
                "availabilityLabel": "Availability",
                "availabilityValue": "Replies within a few hours, every day",
                "followLabel": "Follow us",
                "formNamePlaceholder": "Your name",
                "formBusinessPlaceholder": "Your business",
                "formWhatsappPlaceholder": "+90 ...",
                "formStatus": "Opening WhatsApp with your details…",
                "waHeading": "New consultation request (website)"
            },
            "footer": {
                "tagline": "AI automation systems for modern businesses.",
                "solutions": "Solutions",
                "company": "Company",
                "connect": "Connect",
                "copyright": "© {year} AuraMind AI. All rights reserved.",
                "location": "Lefkoşa · Northern Cyprus"
            },
            "pricing": {
                "metaTitle": "Pricing | AuraMind AI",
                "metaDescription": "Simple pricing for AuraMind's WhatsApp AI assistant. Starter, Business and Pro packages with a one-time $200 setup fee.",
                "title": "Clear pricing for every stage of your business.",
                "description": "Choose the plan that fits your business. Every package includes hosting, maintenance and small updates.",
                "setupLabel": "One-time setup fee",
                "setupNote": "Applies to every package",
                "setupPrice": "200",
                "popular": "Most popular",
                "perMonth": "/ month",
                "firstPayment": "First payment (setup + month 1)",
                "cta": "Get started",
                "starterTag": "For businesses starting with an AI assistant on WhatsApp.",
                "starterPrice": "99.90",
                "starterFirst": "299.90",
                "starterF1": "AI WhatsApp assistant that replies instantly",
                "starterF2": "Answers customer questions (FAQs)",
                "starterF3": "Captures and saves lead details",
                "starterF4": "Up to 2 languages",
                "starterF5": "Hosting, maintenance & small updates",
                "businessTag": "For businesses serving customers in several languages.",
                "businessPrice": "199.90",
                "businessFirst": "399.90",
                "businessF1": "Everything in Starter",
                "businessF2": "Multilingual: English, Turkish & Arabic",
                "businessF3": "Appointment / booking integration",
                "businessF4": "Instant lead notifications to the business owner",
                "proTag": "For growing teams that want follow-ups and lead tracking.",
                "proPrice": "300.00",
                "proFirst": "500.00",
                "proF1": "Everything in Business",
                "proF2": "CRM / Google Sheets lead integration",
                "proF3": "Automated follow-up messages",
                "proF4": "Priority support",
                "notesTitle": "Notes",
                "note1": "All prices are in US dollars (USD).",
                "note2": "The one-time setup fee of $200 applies to every package.",
                "note3": "The monthly fee covers hosting, maintenance and small updates.",
                "ctaTitle": "Not sure which plan fits?",
                "ctaText": "Tell us about your business and we’ll recommend the right package.",
                "ctaButton": "Talk to us",
                "waMessage": "Hi AuraMind, I'm interested in the plan:"
            },
            "preview": {
                "title": "Simple, transparent pricing",
                "description": "Three packages, one setup fee. Hosting, maintenance and small updates are always included.",
                "d1": "WhatsApp AI assistant, FAQs and lead capture.",
                "d2": "Everything in Starter, plus three languages, booking and instant lead alerts.",
                "d3": "Everything in Business, plus CRM / Google Sheets, follow-ups and priority support.",
                "setup": "+ $200 one-time setup fee on every package",
                "all": "See full pricing"
            },
            "faq": {
                "title": "Common questions",
                "description": "Straight answers before you get in touch.",
                "q1": "What does the setup fee cover?",
                "a1": "It is a one-time $200 fee that applies to every package. After that, the monthly fee covers hosting, maintenance and small updates.",
                "q2": "Which languages can the assistant use?",
                "a2": "Starter supports up to 2 languages. Business and Pro support English, Turkish and Arabic.",
                "q3": "Can my team take over a conversation?",
                "a3": "Yes. The assistant handles routine questions, and your team steps in whenever a person is needed. On Business and Pro you also get instant lead notifications.",
                "q4": "How do I get started?",
                "a4": "Fill in the short form below. It opens WhatsApp so we can reply directly, usually within a few hours."
            },
            "a11y": {
                "skip": "Skip to content",
                "home": "AuraMind home",
                "mainNav": "Main navigation",
                "mobileNav": "Mobile navigation",
                "language": "Language selector",
                "instagram": "AuraMind on Instagram",
                "linkedin": "AuraMind on LinkedIn"
            },
            "alt": {
                "solution": "A human hand and a robotic hand reaching toward each other, representing AuraMind’s AI working alongside your team",
                "restaurants": "An assortment of appetizers and entrees plated for a restaurant, including chicken tenders, wings, fried bites and fries",
                "realEstate": "A miniature house model beside stacked coins and a rising growth chart, representing real estate investment",
                "clinics": "A modern, softly lit clinic reception desk with curved detailing and ambient lighting",
                "retail": "A smiling small business owner in an apron standing behind a counter with a laptop, in a shop lined with plants"
            },
            "notFound": {
                "metaTitle": "Page not found | AuraMind AI",
                "title": "Page not found",
                "text": "The page you’re looking for doesn’t exist or has moved.",
                "button": "Back to home"
            }
        },
        "tr": {
            "meta": {
                "description": "AuraMind; WhatsApp, Instagram ve web siteniz için müşterilere yanıt veren, potansiyel müşteri toplayan, sipariş ve randevu alan özel yapay zeka asistanları kurar. 7/24.",
                "title": "AuraMind | Yapay Zeka Otomasyon Ajansı",
                "ogDescription": "Müşterilere yanıt veren, potansiyel müşteri toplayan ve sipariş alan özel yapay zeka asistanları. 7/24."
            },
            "nav": {
                "services": "Hizmetler",
                "industries": "Sektörler",
                "howItWorks": "Nasıl Çalışır",
                "about": "Hakkımızda",
                "contact": "İletişim",
                "bookDemo": "Demo Talep Et",
                "openMenu": "Menüyü aç",
                "closeMenu": "Menüyü kapat",
                "pricing": "Fiyatlandırma"
            },
            "hero": {
                "eyebrow": "YAPAY ZEKA İLE İŞLETME OTOMASYONU",
                "h1_line1": "Müşterilerinizi yanıtlayan yapay zeka,",
                "h1_line2": "ekibiniz büyümeye odaklansın.",
                "description": "AuraMind; müşterilerle konuşan, potansiyel müşteri toplayan, sipariş alan, görüşmeleri hatırlayan ve tekrarlayan işleri otomatikleştiren özel yapay zeka sistemleri kurar — 7/24.",
                "btnPrimary": "Ücretsiz Demo Talep Edin",
                "btnSecondary": "Nasıl Çalıştığını Görün",
                "trustAvailability": "Kesintisiz yapay zeka",
                "trustResponse": "Müşteri yanıtları",
                "trustCustom": "İşletmenize özel kurulur",
                "online": "Çevrimiçi",
                "previewCustomerLabel": "Müşteri",
                "previewCustomer": "Merhaba, teslimat yapıyor musunuz?",
                "previewAiLabel": "AuraMind AI",
                "previewAi": "Elbette. Teslimat, siparişler ve işletmemizle ilgili tüm sorularınızda yardımcı olabilirim.",
                "previewAction1": "Görüşme anlaşıldı",
                "previewAction2": "Müşteri bilgisi kaydedildi",
                "previewAction3": "Sonraki adım tetiklendi",
                "floatTopTitle": "Müşteri kaydedildi",
                "floatTopText": "İş akışınız için hazır",
                "floatBottomTitle": "Yapay zeka çalışıyor",
                "floatBottomText": "Manuel yanıt gerekmiyor",
                "trustAvailabilityValue": "7/24",
                "trustResponseValue": "Anında",
                "trustCustomValue": "Özel"
            },
            "platforms": {
                "label": "Müşterilerinizin zaten kullandığı kanallar için tasarlandı"
            },
            "problem": {
                "kicker": "SORUN",
                "title": "Müşterileriniz beklemiyor.",
                "description": "Yanıtsız kalan her mesaj, geciken her yanıt ve tekrarlayan her görev işletmenizde aksamaya yol açar.",
                "card1Title": "Kaçırılan mesajlar",
                "card1Text": "Ekibiniz meşgulken, çevrimdışıyken veya müsait değilken müşteriler size ulaşmaya çalışır.",
                "card2Title": "Yavaş yanıtlar",
                "card2Text": "Gecikmiş yanıtlar ilgilenen müşterileri kaybedilen fırsatlara dönüştürebilir.",
                "card3Title": "Manuel iş yükü",
                "card3Text": "Ekibiniz aynı soruları yanıtlamak ve tekrarlayan talepleri işlemek için değerli zamanını harcıyor.",
                "card4Title": "Dağınık bilgiler",
                "card4Text": "Müşteri görüşmelerini, potansiyel müşterileri, siparişleri ve takipleri elle yönetmek zamanla zorlaşabilir."
            },
            "solution": {
                "coreText": "İş Sistemi",
                "item1Title": "Anlar",
                "item2Title": "Hatırlar",
                "item3Title": "Harekete Geçer",
                "kicker": "AURAMIND SİSTEMİ",
                "title": "Bir sohbet robotundan fazlası.",
                "description": "AuraMind, yapay zeka görüşmelerini işletmenizin gerçekten ihtiyaç duyduğu iş akışlarına bağlar.",
                "item1Text": "Müşteri niyetini ve bağlamını anlar.",
                "item2Text": "Görüşmeler arasında önemli müşteri bilgilerini saklar.",
                "item3Text": "Doğru iş akışını doğru zamanda tetikler.",
                "item4Title": "Devreder",
                "item4Text": "İnsan müdahalesi gerektiğinde ekibinizi devreye sokar."
            },
            "services": {
                "kicker": "YAPAY ZEKA ÇÖZÜMLERİ",
                "title": "Neyi otomatikleştirebiliriz?",
                "description": "İşletmenizin çalışma şekline göre tasarlanmış özel yapay zeka sistemleri.",
                "card1Title": "Yapay Zeka Müşteri Desteği",
                "card1Text": "Müşteri sorularını anında yanıtlayın ve ekibinize daha fazla yük bindirmeden görüşmeleri sürdürün.",
                "learnMore": "Çözümü keşfedin →",
                "card2Title": "Yapay Zeka ile Potansiyel Müşteri Toplama",
                "card2Text": "Müşteri görüşmelerini, işletmenizin gerçekten takip edebileceği düzenli potansiyel müşteri kayıtlarına dönüştürün.",
                "card3Title": "Yapay Zeka ile Sipariş Alma",
                "card3Text": "Müşterilerin doğal bir sohbetle sipariş vermesine izin verirken işletmeniz ihtiyaç duyduğu bilgileri alsın.",
                "card4Title": "Yapay Zeka ile Takip",
                "card4Text": "Görüşmeleri otomatik olarak sürdürün ve başka bir temasa ihtiyaç duyan müşterileri takip edin.",
                "card5Title": "Yapay Zeka ile Randevu Alma",
                "card5Text": "Randevu taleplerini yönetin ve müşterilerin manuel yazışma olmadan bir sonraki adımı bulmasına yardımcı olun.",
                "card6Title": "Özel Yapay Zeka Ajanları",
                "card6Text": "İşletmenizin ihtiyaç duyduğu özel görevler, sistemler ve müşteri etkileşimleri etrafında bir yapay zeka iş akışı kurun."
            },
            "industries": {
                "kicker": "GERÇEK İŞLETMELER İÇİN",
                "title": "Sektörünüze uygun yapay zeka.",
                "description": "Doğru otomasyon, müşterilerinizin işletmenizle nasıl etkileşime girdiğine bağlıdır.",
                "restaurantTitle": "Restoranlar",
                "restaurantText": "Müşteri desteği, sipariş alma, teslimat bilgisi ve otomatik sipariş iş akışları.",
                "realEstateTitle": "Emlak",
                "realEstateText": "Emlak taleplerini toplayın, potansiyel müşterileri değerlendirin ve süreci ilerletin.",
                "clinicTitle": "Klinikler",
                "clinicText": "Sık sorulan soruları yanıtlayın, talepleri yönetin ve randevu süreçlerini destekleyin.",
                "retailTitle": "Perakende ve Yerel İşletmeler",
                "retailText": "Günlük müşteri görüşmelerini, soruları ve tekrarlayan görevleri otomatikleştirin."
            },
            "steps": {
                "kicker": "NASIL ÇALIŞIR",
                "title": "Görüşmeden harekete.",
                "description": "AuraMind, müşteri görüşmesini bir sonraki adımda gerçekleşmesi gereken iş eylemine bağlar.",
                "step1Title": "Müşteri size ulaşır",
                "step1Text": "Bir müşteri, işletmenizin zaten kullandığı bir kanal üzerinden görüşme başlatır.",
                "step2Title": "Yapay zeka anlar",
                "step2Text": "AuraMind talebi anlar ve elindeki bilgileri kullanarak doğal bir şekilde yanıt verir.",
                "step3Title": "Bilgi hatırlanır",
                "step3Text": "Önemli müşteri bilgileri saklanabilir ve gelecekteki görüşmelerde kullanılabilir.",
                "step4Title": "İşletmeniz sonucu alır",
                "step4Text": "Potansiyel müşteriler toplanır, siparişler işlenir, iş akışları tetiklenir veya ekibiniz bilgilendirilir."
            },
            "why": {
                "kicker": "NEDEN AURAMIND",
                "title": "İşletmenizin çalışma şekline uygun yapay zeka.",
                "description": "İşletmeniz benzersiz. Otomasyonunuz da öyle olmalı.",
                "card1Title": "Kişiye Özel",
                "card1Text": "İşletmeniz, müşterileriniz, bilgileriniz ve iş akışlarınız etrafında kurulur.",
                "card2Title": "Her Zaman Açık",
                "card2Text": "Müşterilere mesai saatleri dışında da yanıt alma ve görüşme başlatma imkânı sunar.",
                "card3Title": "Bağlantılı",
                "card3Text": "Müşteri görüşmelerini işletmenizin güvendiği araçlara ve iş akışlarına bağlar.",
                "card4Title": "Gerektiğinde İnsan Desteği",
                "card4Text": "Otomasyon ekibinizi desteklemeli, önemli olduğunda insan müdahalesini engellememelidir."
            },
            "demo": {
                "kicker": "ÖRNEK GÖRÜŞME",
                "title": "Tipik bir görüşme böyle görünür.",
                "description": "Müşteri bir soru sorar; asistan işletmenizin bilgilerini kullanarak anında yanıt verir ve gerektiğinde ekibinizi devreye sokar.",
                "button": "AuraMind ile Konuşun",
                "online": "Çevrimiçi",
                "message1": "İşletmem için neleri otomatikleştirebilirsiniz?",
                "message2": "Müşteri desteği, potansiyel müşteri toplama, siparişler, randevular, takipler ve diğer tekrarlayan iş akışlarını otomatikleştirmenize yardımcı olabilirim.",
                "suggestion1": "Müşteri desteği",
                "suggestion2": "Potansiyel müşteri toplama",
                "suggestion3": "Siparişler"
            },
            "contact": {
                "kicker": "KONUŞALIM",
                "title": "İşletmeniz neyi otomatikleştirebilir?",
                "description": "İşletmeniz hakkında birkaç bilgi verin, yapay zekanın en büyük farkı nerede yaratabileceğini birlikte belirleyelim.",
                "formTitle": "Yapay zeka otomasyon planınızı başlatın.",
                "formSubtitle": "Neyi otomatikleştirmek istediğinizi anlamamız için birkaç detay yeterli.",
                "formName": "Adınız",
                "formBusiness": "İşletme adı",
                "formType": "İşletme türü",
                "formTypePlaceholder": "Birini seçin",
                "typeRestaurant": "Restoran",
                "typeRealEstate": "Emlak",
                "typeClinic": "Klinik",
                "typeRetail": "Perakende ve Yerel İşletme",
                "typeOther": "Diğer",
                "formGoal": "Neyi otomatikleştirmek istersiniz?",
                "formGoalPlaceholder": "Birini seçin",
                "goalSupport": "Müşteri desteği",
                "goalLeads": "Potansiyel müşteri toplama",
                "goalOrders": "Siparişler",
                "goalAppointments": "Randevular",
                "goalOther": "Diğer",
                "formWhatsapp": "WhatsApp numarası",
                "formSubmit": "Ücretsiz Danışmanlık İsteyin",
                "formNote": "Talebiniz WhatsApp’ta açılır; böylece size doğrudan yanıt verebiliriz.",
                "emailLabel": "E-posta",
                "phoneLabel": "Telefon / WhatsApp",
                "locationLabel": "Konum",
                "locationValue": "Lefkoşa, Kuzey Kıbrıs",
                "availabilityLabel": "Müsaitlik",
                "availabilityValue": "Her gün birkaç saat içinde yanıt veriyoruz",
                "followLabel": "Bizi takip edin",
                "formNamePlaceholder": "Adınız",
                "formBusinessPlaceholder": "İşletmeniz",
                "formWhatsappPlaceholder": "+90 ...",
                "formStatus": "Bilgilerinizle WhatsApp açılıyor…",
                "waHeading": "Yeni danışmanlık talebi (web sitesi)"
            },
            "footer": {
                "tagline": "Modern işletmeler için yapay zeka otomasyon sistemleri.",
                "solutions": "Çözümler",
                "company": "Şirket",
                "connect": "Bize Ulaşın",
                "copyright": "© {year} AuraMind AI. Tüm hakları saklıdır.",
                "location": "Lefkoşa · Kuzey Kıbrıs"
            },
            "pricing": {
                "metaTitle": "Fiyatlandırma | AuraMind AI",
                "metaDescription": "AuraMind WhatsApp yapay zeka asistanı için sade fiyatlandırma. Tek seferlik 200 $ kurulum ücretiyle Starter, Business ve Pro paketleri.",
                "title": "İşletmenizin her aşaması için net fiyatlandırma.",
                "description": "İşletmenize uygun planı seçin. Her paket barındırma, bakım ve küçük güncellemeleri içerir.",
                "setupLabel": "Tek seferlik kurulum ücreti",
                "setupNote": "Tüm paketler için geçerlidir",
                "setupPrice": "200",
                "popular": "En popüler",
                "perMonth": "/ ay",
                "firstPayment": "İlk ödeme (kurulum + 1. ay)",
                "cta": "Hemen başlayın",
                "starterTag": "WhatsApp'ta yapay zeka asistanıyla başlamak isteyen işletmeler için.",
                "starterPrice": "99,90",
                "starterFirst": "299,90",
                "starterF1": "Anında yanıt veren yapay zeka WhatsApp asistanı",
                "starterF2": "Müşteri sorularını yanıtlar (SSS)",
                "starterF3": "Potansiyel müşterileri toplar ve kaydeder",
                "starterF4": "En fazla 2 dil",
                "starterF5": "Barındırma, bakım ve küçük güncellemeler",
                "businessTag": "Müşterilerine birden fazla dilde hizmet veren işletmeler için.",
                "businessPrice": "199,90",
                "businessFirst": "399,90",
                "businessF1": "Starter paketindeki her şey",
                "businessF2": "Çok dilli: İngilizce, Türkçe ve Arapça",
                "businessF3": "Randevu / rezervasyon entegrasyonu",
                "businessF4": "Potansiyel müşteri bildirimleri işletme sahibine anında iletilir",
                "proTag": "Takip mesajları ve müşteri kaydı isteyen büyüyen ekipler için.",
                "proPrice": "300,00",
                "proFirst": "500,00",
                "proF1": "Business paketindeki her şey",
                "proF2": "CRM / Google Sheets müşteri kaydı entegrasyonu",
                "proF3": "Otomatik takip mesajları",
                "proF4": "Öncelikli destek",
                "notesTitle": "Notlar",
                "note1": "Tüm fiyatlar ABD doları (USD) cinsindendir.",
                "note2": "200 $ tutarındaki tek seferlik kurulum ücreti tüm paketler için geçerlidir.",
                "note3": "Aylık ücret barındırma, bakım ve küçük güncellemeleri kapsar.",
                "ctaTitle": "Hangi plan size uygun, emin değil misiniz?",
                "ctaText": "İşletmenizi bize anlatın, size doğru paketi önerelim.",
                "ctaButton": "Bizimle konuşun",
                "waMessage": "Merhaba AuraMind, şu planla ilgileniyorum:"
            },
            "preview": {
                "title": "Sade ve şeffaf fiyatlandırma",
                "description": "Üç paket, tek kurulum ücreti. Barındırma, bakım ve küçük güncellemeler her zaman dahildir.",
                "d1": "WhatsApp yapay zeka asistanı, SSS ve potansiyel müşteri toplama.",
                "d2": "Starter'daki her şey, ayrıca üç dil, randevu ve anında müşteri bildirimleri.",
                "d3": "Business'taki her şey, ayrıca CRM / Google Sheets, otomatik takip ve öncelikli destek.",
                "setup": "+ Her pakette 200 $ tek seferlik kurulum ücreti",
                "all": "Tüm fiyatları görün"
            },
            "faq": {
                "title": "Sık sorulan sorular",
                "description": "İletişime geçmeden önce net cevaplar.",
                "q1": "Kurulum ücreti neleri kapsar?",
                "a1": "Tek seferlik 200 $'dır ve tüm paketler için geçerlidir. Sonrasında aylık ücret barındırma, bakım ve küçük güncellemeleri kapsar.",
                "q2": "Asistan hangi dilleri kullanabilir?",
                "a2": "Starter en fazla 2 dili destekler. Business ve Pro İngilizce, Türkçe ve Arapça'yı destekler.",
                "q3": "Ekibim görüşmeyi devralabilir mi?",
                "a3": "Evet. Asistan rutin soruları yanıtlar, bir insana ihtiyaç duyulduğunda ekibiniz devreye girer. Business ve Pro'da ayrıca anında müşteri bildirimi alırsınız.",
                "q4": "Nasıl başlarım?",
                "a4": "Aşağıdaki kısa formu doldurun. Doğrudan yanıt verebilmemiz için WhatsApp açılır; genellikle birkaç saat içinde dönüş yaparız."
            },
            "a11y": {
                "skip": "İçeriğe geç",
                "home": "AuraMind ana sayfa",
                "mainNav": "Ana gezinme",
                "mobileNav": "Mobil gezinme",
                "language": "Dil seçimi",
                "instagram": "AuraMind Instagram’da",
                "linkedin": "AuraMind LinkedIn’de"
            },
            "alt": {
                "solution": "Birbirine uzanan bir insan eli ve bir robot eli; AuraMind yapay zekasının ekibinizle birlikte çalışmasını temsil eder",
                "restaurants": "Bir restoran için tabaklanmış çıtır tavuk, kanat, atıştırmalıklar ve patates kızartması gibi çeşitli başlangıçlar ve ana yemekler",
                "realEstate": "Üst üste dizilmiş madeni paraların ve yükselen bir büyüme grafiğinin yanında minyatür bir ev maketi; emlak yatırımını temsil eder",
                "clinics": "Kavisli detaylara ve yumuşak aydınlatmaya sahip modern bir klinik resepsiyon masası",
                "retail": "Bitkilerle dolu bir dükkânda, önlüklü ve gülümseyen bir küçük işletme sahibi dizüstü bilgisayarla tezgâhın arkasında duruyor"
            },
            "notFound": {
                "metaTitle": "Sayfa bulunamadı | AuraMind AI",
                "title": "Sayfa bulunamadı",
                "text": "Aradığınız sayfa mevcut değil veya taşınmış.",
                "button": "Ana sayfaya dön"
            }
        },
        "ar": {
            "meta": {
                "description": "تبني AuraMind مساعدين بالذكاء الاصطناعي لواتساب وإنستغرام وموقعك، يردون على العملاء ويرصدون العملاء المحتملين ويستقبلون الطلبات والمواعيد على مدار الساعة.",
                "title": "AuraMind | وكالة أتمتة بالذكاء الاصطناعي",
                "ogDescription": "مساعدون بالذكاء الاصطناعي يردون على العملاء ويرصدون العملاء المحتملين ويستقبلون الطلبات على مدار الساعة."
            },
            "nav": {
                "services": "الخدمات",
                "industries": "القطاعات",
                "howItWorks": "كيف يعمل",
                "about": "من نحن",
                "contact": "تواصل معنا",
                "bookDemo": "احجز عرضًا تجريبيًا",
                "openMenu": "فتح القائمة",
                "closeMenu": "إغلاق القائمة",
                "pricing": "الأسعار"
            },
            "hero": {
                "eyebrow": "أتمتة الأعمال بالذكاء الاصطناعي",
                "h1_line1": "ذكاء اصطناعي يرد على عملائك،",
                "h1_line2": "ليتفرغ فريقك للنمو.",
                "description": "تبني AuraMind أنظمة ذكاء اصطناعي مخصصة تتحدث مع العملاء، وترصد العملاء المحتملين، وتستقبل الطلبات، وتتذكر المحادثات، وتؤتمت الأعمال المتكررة — على مدار الساعة.",
                "btnPrimary": "احجز عرضًا تجريبيًا مجانيًا",
                "btnSecondary": "شاهد كيف يعمل",
                "trustAvailability": "خدمة متواصلة",
                "trustResponse": "الرد على العملاء",
                "trustCustom": "مصمم خصيصًا لعملك",
                "online": "متصل",
                "previewCustomerLabel": "العميل",
                "previewCustomer": "مرحبًا، هل تقدمون خدمة التوصيل؟",
                "previewAiLabel": "AuraMind AI",
                "previewAi": "بالتأكيد. يمكنني مساعدتك في التوصيل والطلبات وأي أسئلة حول العمل.",
                "previewAction1": "تم فهم المحادثة",
                "previewAction2": "تم رصد بيانات العميل",
                "previewAction3": "تم تفعيل الإجراء التالي",
                "floatTopTitle": "تم رصد العميل",
                "floatTopText": "جاهز لسير عملك",
                "floatBottomTitle": "الذكاء الاصطناعي يعمل",
                "floatBottomText": "لا حاجة لرد يدوي",
                "trustAvailabilityValue": "24/7",
                "trustResponseValue": "فوري",
                "trustCustomValue": "مخصص"
            },
            "platforms": {
                "label": "مصمم للقنوات التي يستخدمها عملاؤك بالفعل"
            },
            "problem": {
                "kicker": "المشكلة",
                "title": "عملاؤك لا ينتظرون.",
                "description": "كل رسالة دون رد، وكل استجابة متأخرة، وكل مهمة متكررة تخلق عائقًا أمام عملك.",
                "card1Title": "رسائل فائتة",
                "card1Text": "يتواصل العملاء معك بينما فريقك مشغول أو غير متصل أو غير متاح.",
                "card2Title": "ردود بطيئة",
                "card2Text": "الردود المتأخرة قد تحول العملاء المهتمين إلى فرص ضائعة.",
                "card3Title": "عمل يدوي",
                "card3Text": "يقضي فريقك وقتًا ثمينًا في الإجابة عن نفس الأسئلة ومعالجة الطلبات المتكررة.",
                "card4Title": "معلومات متناثرة",
                "card4Text": "قد يصبح من الصعب إدارة محادثات العملاء والعملاء المحتملين والطلبات والمتابعات يدويًا."
            },
            "solution": {
                "coreText": "نظام أعمال",
                "item1Title": "يفهم",
                "item2Title": "يتذكر",
                "item3Title": "يتصرف",
                "kicker": "نظام AuraMind",
                "title": "أكثر من مجرد روبوت محادثة.",
                "description": "يربط AuraMind محادثات الذكاء الاصطناعي بسير العمل الذي يحتاجه عملك فعليًا.",
                "item1Text": "يفهم نية العميل وسياق حديثه.",
                "item2Text": "يحتفظ بمعلومات العميل المهمة عبر المحادثات.",
                "item3Text": "يفعّل سير العمل المناسب في الوقت المناسب.",
                "item4Title": "التسليم للفريق",
                "item4Text": "يُشرك فريقك عندما يكون التدخل البشري ضروريًا."
            },
            "services": {
                "kicker": "حلول الذكاء الاصطناعي",
                "title": "ماذا يمكننا أن نؤتمت؟",
                "description": "أنظمة ذكاء اصطناعي مخصصة مصممة حول طريقة عمل شركتك.",
                "card1Title": "دعم العملاء بالذكاء الاصطناعي",
                "card1Text": "أجب عن أسئلة العملاء فورًا وحافظ على استمرار المحادثات دون إضافة عبء على فريقك.",
                "learnMore": "اكتشف الحل ←",
                "card2Title": "رصد العملاء المحتملين بالذكاء الاصطناعي",
                "card2Text": "حوّل محادثات العملاء إلى عملاء محتملين منظمين يمكن لعملك متابعتهم فعليًا.",
                "card3Title": "استقبال الطلبات بالذكاء الاصطناعي",
                "card3Text": "دع العملاء يقدمون طلباتهم عبر محادثة طبيعية بينما يحصل عملك على المعلومات التي يحتاجها.",
                "card4Title": "المتابعة بالذكاء الاصطناعي",
                "card4Text": "استمر في المحادثات تلقائيًا وتابع مع العملاء الذين يحتاجون إلى نقطة تواصل أخرى.",
                "card5Title": "حجز المواعيد بالذكاء الاصطناعي",
                "card5Text": "أدر طلبات المواعيد وساعد العملاء في إيجاد الخطوة التالية دون تواصل يدوي متكرر.",
                "card6Title": "وكلاء ذكاء اصطناعي مخصصون",
                "card6Text": "ابنِ سير عمل ذكاء اصطناعي حول المهام والأنظمة وتفاعلات العملاء التي يحتاجها عملك تحديدًا."
            },
            "industries": {
                "kicker": "مصمم لشركات حقيقية",
                "title": "ذكاء اصطناعي يناسب قطاعك.",
                "description": "الأتمتة المناسبة تعتمد على طريقة تفاعل عملائك مع عملك.",
                "restaurantTitle": "المطاعم",
                "restaurantText": "دعم العملاء، استقبال الطلبات، معلومات التوصيل، وسير عمل الطلبات الآلي.",
                "realEstateTitle": "العقارات",
                "realEstateText": "رصد استفسارات العقارات، وتأهيل العملاء المحتملين، والحفاظ على تفاعلهم.",
                "clinicTitle": "العيادات",
                "clinicText": "الإجابة عن الأسئلة الشائعة، وإدارة الطلبات، ودعم سير عمل المواعيد.",
                "retailTitle": "التجزئة والأعمال المحلية",
                "retailText": "أتمتة محادثات العملاء اليومية والاستفسارات والمهام المتكررة."
            },
            "steps": {
                "kicker": "كيف يعمل",
                "title": "من المحادثة إلى الإجراء.",
                "description": "يربط AuraMind محادثة العميل بإجراء العمل الذي يجب أن يحدث بعد ذلك.",
                "step1Title": "يتواصل معك العميل",
                "step1Text": "يبدأ العميل محادثة عبر قناة يستخدمها عملك بالفعل.",
                "step2Title": "يفهم الذكاء الاصطناعي",
                "step2Text": "يفهم AuraMind الطلب ويرد بشكل طبيعي باستخدام المعلومات المتاحة له.",
                "step3Title": "يتم تذكر المعلومات",
                "step3Text": "يمكن حفظ معلومات العميل المهمة واستخدامها في المحادثات المستقبلية.",
                "step4Title": "يحصل عملك على النتيجة",
                "step4Text": "يتم رصد العملاء المحتملين، ومعالجة الطلبات، وتفعيل سير العمل، أو إشعار فريقك."
            },
            "why": {
                "kicker": "لماذا AuraMind",
                "title": "ذكاء اصطناعي يعمل بالطريقة التي يعمل بها عملك.",
                "description": "عملك فريد من نوعه. وأتمتتك يجب أن تكون كذلك أيضًا.",
                "card1Title": "مخصص",
                "card1Text": "مبني حول عملك وعملائك ومعلوماتك وسير عملك.",
                "card2Title": "متاح دائمًا",
                "card2Text": "يمنح العملاء طريقة للحصول على إجابات وبدء محادثات خارج ساعات العمل.",
                "card3Title": "متصل",
                "card3Text": "يربط محادثات العملاء بالأدوات وسير العمل التي يعتمد عليها عملك.",
                "card4Title": "تدخل بشري عند الحاجة",
                "card4Text": "يجب أن تدعم الأتمتة فريقك، لا أن تمنع التدخل البشري عندما يكون مهمًا."
            },
            "demo": {
                "kicker": "شاهد الأمر عمليًا",
                "title": "شاهد محادثة نموذجية.",
                "description": "يسأل العميل فيرد المساعد فورًا باستخدام معلومات عملك، ويُشرك فريقك عند الحاجة.",
                "button": "تحدث مع AuraMind",
                "online": "متصل",
                "message1": "ماذا يمكنكم أن تؤتمتوا لعملي؟",
                "message2": "يمكنني المساعدة في أتمتة دعم العملاء، ورصد العملاء المحتملين، والطلبات، والمواعيد، والمتابعات، وسير العمل المتكرر الآخر.",
                "suggestion1": "دعم العملاء",
                "suggestion2": "رصد العملاء المحتملين",
                "suggestion3": "الطلبات"
            },
            "contact": {
                "kicker": "لنتحدث",
                "title": "ماذا يمكن لعملك أن يؤتمت؟",
                "description": "أخبرنا قليلًا عن عملك وسنساعدك في تحديد أين يمكن للذكاء الاصطناعي أن يُحدث أكبر فرق.",
                "formTitle": "ابدأ خطة أتمتة الذكاء الاصطناعي الخاصة بك.",
                "formSubtitle": "بعض التفاصيل تكفي لنفهم ما تريد أن تؤتمته.",
                "formName": "اسمك",
                "formBusiness": "اسم العمل",
                "formType": "نوع العمل",
                "formTypePlaceholder": "اختر واحدًا",
                "typeRestaurant": "مطعم",
                "typeRealEstate": "عقارات",
                "typeClinic": "عيادة",
                "typeRetail": "التجزئة والأعمال المحلية",
                "typeOther": "أخرى",
                "formGoal": "ماذا تود أن تؤتمت؟",
                "formGoalPlaceholder": "اختر واحدًا",
                "goalSupport": "دعم العملاء",
                "goalLeads": "رصد العملاء المحتملين",
                "goalOrders": "الطلبات",
                "goalAppointments": "المواعيد",
                "goalOther": "أخرى",
                "formWhatsapp": "رقم واتساب",
                "formSubmit": "اطلب استشارة مجانية",
                "formNote": "سيُفتح طلبك في واتساب حتى نتمكن من الرد عليك مباشرة.",
                "emailLabel": "البريد الإلكتروني",
                "phoneLabel": "الهاتف / واتساب",
                "locationLabel": "الموقع",
                "locationValue": "نيقوسيا (لفكوشا)، شمال قبرص",
                "availabilityLabel": "التوفر",
                "availabilityValue": "نرد خلال ساعات قليلة كل يوم",
                "followLabel": "تابعنا",
                "formNamePlaceholder": "اسمك",
                "formBusinessPlaceholder": "اسم عملك",
                "formWhatsappPlaceholder": "+90 ...",
                "formStatus": "جارٍ فتح واتساب ببياناتك…",
                "waHeading": "طلب استشارة جديد (من الموقع)"
            },
            "footer": {
                "tagline": "أنظمة أتمتة بالذكاء الاصطناعي للشركات الحديثة.",
                "solutions": "الحلول",
                "company": "الشركة",
                "connect": "تواصل",
                "copyright": "© {year} AuraMind AI. جميع الحقوق محفوظة.",
                "location": "نيقوسيا · شمال قبرص"
            },
            "pricing": {
                "metaTitle": "الأسعار | AuraMind AI",
                "metaDescription": "أسعار بسيطة لمساعد واتساب بالذكاء الاصطناعي من AuraMind. باقات Starter وBusiness وPro مع رسوم تأسيس لمرة واحدة قدرها 200 دولار.",
                "title": "أسعار واضحة تناسب كل مرحلة من مراحل عملك.",
                "description": "اختر الباقة التي تناسب عملك. تشمل كل باقة الاستضافة والصيانة والتحديثات الصغيرة.",
                "setupLabel": "رسوم التأسيس لمرة واحدة",
                "setupNote": "تنطبق على جميع الباقات",
                "setupPrice": "200",
                "popular": "الأكثر طلبًا",
                "perMonth": "/ شهريًا",
                "firstPayment": "الدفعة الأولى (التأسيس + الشهر الأول)",
                "cta": "ابدأ الآن",
                "starterTag": "للأعمال التي تبدأ مع مساعد ذكاء اصطناعي على واتساب.",
                "starterPrice": "99.90",
                "starterFirst": "299.90",
                "starterF1": "مساعد واتساب بالذكاء الاصطناعي يرد فورًا",
                "starterF2": "يجيب عن أسئلة العملاء (الأسئلة الشائعة)",
                "starterF3": "يرصد بيانات العملاء المحتملين ويجمعها",
                "starterF4": "حتى لغتين",
                "starterF5": "الاستضافة والصيانة والتحديثات الصغيرة",
                "businessTag": "للأعمال التي تخدم عملاءها بعدة لغات.",
                "businessPrice": "199.90",
                "businessFirst": "399.90",
                "businessF1": "كل ما في باقة Starter",
                "businessF2": "متعدد اللغات: الإنجليزية والتركية والعربية",
                "businessF3": "ربط المواعيد / الحجوزات",
                "businessF4": "إشعارات فورية بالعملاء المحتملين لصاحب العمل",
                "proTag": "للفرق المتنامية التي تريد المتابعة وتتبع العملاء المحتملين.",
                "proPrice": "300.00",
                "proFirst": "500.00",
                "proF1": "كل ما في باقة Business",
                "proF2": "ربط العملاء المحتملين بنظام CRM / Google Sheets",
                "proF3": "رسائل متابعة تلقائية",
                "proF4": "دعم ذو أولوية",
                "notesTitle": "ملاحظات",
                "note1": "جميع الأسعار بالدولار الأمريكي (USD).",
                "note2": "رسوم التأسيس لمرة واحدة وقدرها 200 دولار تنطبق على جميع الباقات.",
                "note3": "تغطي الرسوم الشهرية الاستضافة والصيانة والتحديثات الصغيرة.",
                "ctaTitle": "لست متأكدًا أي باقة تناسبك؟",
                "ctaText": "أخبرنا عن عملك وسنوصي لك بالباقة المناسبة.",
                "ctaButton": "تحدث معنا",
                "waMessage": "مرحبًا AuraMind، أنا مهتم بباقة:"
            },
            "preview": {
                "title": "أسعار بسيطة وشفافة",
                "description": "ثلاث باقات ورسوم تأسيس واحدة. الاستضافة والصيانة والتحديثات الصغيرة مشمولة دائمًا.",
                "d1": "مساعد واتساب بالذكاء الاصطناعي، والأسئلة الشائعة، ورصد العملاء المحتملين.",
                "d2": "كل ما في Starter، إضافة إلى ثلاث لغات والحجوزات وإشعارات فورية بالعملاء.",
                "d3": "كل ما في Business، إضافة إلى CRM / Google Sheets والمتابعة التلقائية والدعم ذي الأولوية.",
                "setup": "+ رسوم تأسيس لمرة واحدة قدرها 200 دولار على كل باقة",
                "all": "شاهد الأسعار كاملة"
            },
            "faq": {
                "title": "أسئلة شائعة",
                "description": "إجابات واضحة قبل أن تتواصل معنا.",
                "q1": "ماذا تشمل رسوم التأسيس؟",
                "a1": "هي رسوم لمرة واحدة قدرها 200 دولار وتنطبق على جميع الباقات. بعدها تغطي الرسوم الشهرية الاستضافة والصيانة والتحديثات الصغيرة.",
                "q2": "ما اللغات التي يستخدمها المساعد؟",
                "a2": "تدعم Starter حتى لغتين. وتدعم Business وPro الإنجليزية والتركية والعربية.",
                "q3": "هل يستطيع فريقي تولي المحادثة؟",
                "a3": "نعم. يتولى المساعد الأسئلة المعتادة، ويتدخل فريقك عند الحاجة إلى شخص. وفي Business وPro تصلك أيضًا إشعارات فورية بالعملاء.",
                "q4": "كيف أبدأ؟",
                "a4": "املأ النموذج القصير أدناه. سيُفتح واتساب لنرد عليك مباشرة، عادةً خلال ساعات قليلة."
            },
            "a11y": {
                "skip": "انتقل إلى المحتوى",
                "home": "الصفحة الرئيسية لـ AuraMind",
                "mainNav": "التنقل الرئيسي",
                "mobileNav": "التنقل في الجوال",
                "language": "اختيار اللغة",
                "instagram": "AuraMind على إنستغرام",
                "linkedin": "AuraMind على لينكدإن"
            },
            "alt": {
                "solution": "يد بشرية ويد روبوتية تمتدان نحو بعضهما، تعبيرًا عن عمل ذكاء AuraMind الاصطناعي إلى جانب فريقك",
                "restaurants": "تشكيلة من المقبلات والأطباق الرئيسية في مطعم، تشمل أصابع الدجاج والأجنحة والقطع المقلية والبطاطس",
                "realEstate": "نموذج منزل مصغّر بجانب عملات معدنية مكدسة ومخطط نمو صاعد، يرمز إلى الاستثمار العقاري",
                "clinics": "مكتب استقبال عيادة حديث بإضاءة هادئة وتفاصيل منحنية",
                "retail": "صاحب عمل صغير مبتسم يرتدي مريلة ويقف خلف طاولة مع حاسوب محمول داخل متجر مزين بالنباتات"
            },
            "notFound": {
                "metaTitle": "الصفحة غير موجودة | AuraMind AI",
                "title": "الصفحة غير موجودة",
                "text": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
                "button": "العودة إلى الرئيسية"
            }
        }
    };


    /* =====================================================
       I18N ENGINE
    ===================================================== */

    const I18N = (() => {
        let currentLang = DEFAULT_LANG;

        function getNested(object, path) {
            return path.split(".").reduce(
                (value, key) => (value && value[key] !== undefined ? value[key] : undefined),
                object
            );
        }

        /* Returns a string, or undefined when the key does not exist at all. */
        function lookup(key, lang) {
            let value = getNested(translations[lang] || translations[DEFAULT_LANG], key);
            if (value === undefined) value = getNested(translations[DEFAULT_LANG], key);
            if (typeof value === "string") {
                value = value.replace("{year}", String(new Date().getFullYear()));
            }
            return value;
        }

        function translate(key, lang = currentLang) {
            const value = lookup(key, lang);
            if (value === undefined) {
                console.warn(`[AuraMind i18n] Unknown key "${key}"`);
                return "";
            }
            return value;
        }

        function detectBrowserLanguage() {
            const languages =
                Array.isArray(navigator.languages) && navigator.languages.length
                    ? navigator.languages
                    : [navigator.language || DEFAULT_LANG];

            for (const language of languages) {
                const code = String(language).slice(0, 2).toLowerCase();
                if (SUPPORTED_LANGS.includes(code)) return code;
            }
            return DEFAULT_LANG;
        }

        function readUrlLanguage() {
            try {
                const code = new URLSearchParams(window.location.search).get("lang");
                return code && SUPPORTED_LANGS.includes(code.toLowerCase()) ? code.toLowerCase() : null;
            } catch (error) {
                return null;
            }
        }

        function loadSavedLanguage() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                return saved && SUPPORTED_LANGS.includes(saved) ? saved : null;
            } catch (error) {
                return null;
            }
        }

        function saveLanguage(lang) {
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch (error) {
                /* private mode / storage disabled: the choice simply isn't remembered */
            }
        }

        function setMeta(selector, attribute, value) {
            const element = document.querySelector(selector);
            if (element && value) element.setAttribute(attribute, value);
        }

        function updateMeta(lang) {
            const page = document.body.getAttribute("data-page") || "home";
            const keys = {
                home: ["meta.title", "meta.description", "meta.ogDescription"],
                pricing: ["pricing.metaTitle", "pricing.metaDescription", "pricing.metaDescription"],
                notfound: ["notFound.metaTitle", null, null]
            }[page] || ["meta.title", "meta.description", "meta.ogDescription"];

            const title = translate(keys[0], lang);
            const description = keys[1] ? translate(keys[1], lang) : "";
            const ogDescription = keys[2] ? translate(keys[2], lang) : "";

            document.title = title;
            setMeta('meta[name="description"]', "content", description);
            setMeta('meta[property="og:title"]', "content", title);
            setMeta('meta[property="og:description"]', "content", ogDescription || description);
            setMeta('meta[property="og:locale"]', "content", OG_LOCALES[lang]);
            setMeta('meta[name="twitter:title"]', "content", title);
            setMeta('meta[name="twitter:description"]', "content", ogDescription || description);
        }

        function updateDOM(lang) {
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
                const value = lookup(key, lang);
                if (value === undefined) return; // never blank out existing text

                const attribute = element.getAttribute("data-i18n-attr");
                if (attribute) {
                    element.setAttribute(attribute, value);
                } else {
                    element.textContent = value;
                }
            });

            document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
                const value = lookup(element.getAttribute("data-i18n-placeholder"), lang);
                if (value !== undefined) element.setAttribute("placeholder", value);
            });

            root.lang = lang;
            root.dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";

            updateMeta(lang);
            updateLanguageButtons(lang);
            updatePlanLinks(lang);
        }

        function updateLanguageButtons(lang) {
            document.querySelectorAll(".lang-option").forEach((button) => {
                const active = button.getAttribute("data-lang") === lang;
                button.classList.toggle("is-active", active);
                button.setAttribute("aria-pressed", active ? "true" : "false");
            });
        }

        /* Pricing page: each "Get started" button opens WhatsApp with a
           pre-written message in the visitor's language. */
        function updatePlanLinks(lang) {
            document.querySelectorAll("[data-plan-cta]").forEach((link) => {
                const message = `${translate("pricing.waMessage", lang)} ${link.getAttribute("data-plan-cta")}`;
                link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
            });
        }

        function setLanguage(lang, { persist = true } = {}) {
            if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;

            currentLang = lang;
            updateDOM(lang);
            if (persist) saveLanguage(lang);

            document.dispatchEvent(new CustomEvent("auramind:languagechange", { detail: { lang } }));
        }

        function init() {
            /* Priority: ?lang=xx (shareable links) > saved choice > browser language.
               Only an explicit click on a language button is saved. */
            setLanguage(readUrlLanguage() || loadSavedLanguage() || detectBrowserLanguage(), { persist: false });
        }

        return { init, setLanguage, translate, getCurrentLanguage: () => currentLang };
    })();


    /* =====================================================
       LANGUAGE BUTTONS (desktop + mobile groups)
    ===================================================== */

    function initLanguageButtons() {
        document.querySelectorAll(".lang-option").forEach((button) => {
            button.addEventListener("click", () => {
                const language = button.getAttribute("data-lang");
                if (!SUPPORTED_LANGS.includes(language)) return;

                I18N.setLanguage(language);
                MobileNav.close();
            });
        });
    }


    /* =====================================================
       SCROLL REVEAL
       Content is only hidden while this script is able to reveal
       it. Reduced-motion users and browsers without
       IntersectionObserver get everything immediately.
    ===================================================== */

    const ScrollReveal = (() => {
        function init() {
            const items = document.querySelectorAll("[data-animate]");
            if (!items.length) return;

            if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
                items.forEach((element) => element.classList.add("is-revealed"));
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add("is-revealed");
                        observer.unobserve(entry.target);
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
            );

            items.forEach((element) => observer.observe(element));

            /* Safety net: if anything is still hidden after a few seconds
               (e.g. printed page, odd embedded browser), show it. */
            window.setTimeout(() => {
                items.forEach((element) => element.classList.add("is-revealed"));
            }, 6000);
        }

        return { init };
    })();


    /* =====================================================
       OFFSCREEN GATE
       Infinite CSS animations and the hero video only run while
       they are on screen — saves CPU/battery, especially on phones.
    ===================================================== */

    const OffscreenGate = (() => {
        function init() {
            const targets = document.querySelectorAll(
                ".hero-system-visual, .solution-visual, .lead-form-wrap, .demo-window"
            );
            const video = document.querySelector(".hero-artifact video");

            if (video) setupVideo(video);
            if (!targets.length || !("IntersectionObserver" in window)) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        entry.target.classList.toggle("is-offscreen", !entry.isIntersecting);

                        if (video && entry.target.contains(video)) {
                            if (entry.isIntersecting) playVideo(video);
                            else video.pause();
                        }
                    });
                },
                { rootMargin: "80px 0px" }
            );

            targets.forEach((element) => observer.observe(element));
        }

        function playVideo(video) {
            if (prefersReducedMotion.matches || saveData()) return;
            const attempt = video.play();
            if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
        }

        function saveData() {
            const connection = navigator.connection;
            return Boolean(connection && connection.saveData);
        }

        function setupVideo(video) {
            const holder = video.closest(".hero-artifact");

            /* Missing or failed file: hide the decorative circle instead of showing a black disc. */
            video.addEventListener("error", () => holder && holder.classList.add("asset-missing"), { once: true });

            if (prefersReducedMotion.matches || saveData()) {
                video.removeAttribute("autoplay");
                video.pause();
            }

            document.addEventListener("visibilitychange", () => {
                if (document.hidden) video.pause();
                else if (!video.closest(".is-offscreen")) playVideo(video);
            });
        }

        return { init };
    })();


    /* =====================================================
       SCROLL-AWARE NAVBAR + ACTIVE SECTION LINK
    ===================================================== */

    const ScrollNav = (() => {
        function init() {
            const navbar = document.querySelector(".navbar");
            if (!navbar) return;

            const update = () => navbar.classList.toggle("is-scrolled", window.scrollY > 12);
            window.addEventListener("scroll", update, { passive: true });
            update();

            setupActiveLinks();
        }

        /* Highlights the link of the section crossing the middle of the viewport. */
        function setupActiveLinks() {
            const sections = document.querySelectorAll("main section[id]");
            const links = document.querySelectorAll('.nav-links a[href^="#"]');
            if (!sections.length || !links.length || !("IntersectionObserver" in window)) return;

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        const id = entry.target.getAttribute("id");

                        links.forEach((link) => {
                            const active = link.getAttribute("href") === `#${id}`;
                            link.classList.toggle("is-active", active);
                            if (active) link.setAttribute("aria-current", "location");
                            else link.removeAttribute("aria-current");
                        });
                    });
                },
                { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
            );

            sections.forEach((section) => observer.observe(section));
        }

        return { init };
    })();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const MobileNav = (() => {
        let initialized = false;
        let isOpen = false;
        let button = null;
        let panel = null;

        function updateLabel() {
            if (!button) return;
            const key = isOpen ? "nav.closeMenu" : "nav.openMenu";
            button.setAttribute("aria-label", I18N.translate(key, I18N.getCurrentLanguage()));
        }

        function setState(open) {
            if (!button || !panel) return;

            isOpen = open;
            panel.classList.toggle("open", open);
            button.classList.toggle("is-active", open);
            button.setAttribute("aria-expanded", String(open));
            panel.setAttribute("aria-hidden", String(!open));
            document.body.classList.toggle("menu-open", open);
            updateLabel();
        }

        const open = () => setState(true);
        const close = () => setState(false);
        const toggle = () => setState(!isOpen);

        function init() {
            if (initialized) return;

            button = document.getElementById("mobileMenuButton");
            panel = document.getElementById("mobileNavLinks");
            if (!button || !panel) return;

            initialized = true;

            button.addEventListener("click", toggle);
            panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));

            document.addEventListener("click", (event) => {
                if (isOpen && !panel.contains(event.target) && !button.contains(event.target)) close();
            });

            document.addEventListener("keydown", (event) => {
                if (event.key === "Escape" && isOpen) {
                    close();
                    button.focus();
                }
            });

            /* Leaving the mobile layout (rotate / resize) closes the panel. */
            const desktop = window.matchMedia(DESKTOP_NAV_QUERY);
            const onChange = (event) => { if (event.matches) close(); };
            if (desktop.addEventListener) desktop.addEventListener("change", onChange);
            else if (desktop.addListener) desktop.addListener(onChange);

            document.addEventListener("auramind:languagechange", updateLabel);
        }

        return { init, open, close, toggle };
    })();


    /* =====================================================
       LEAD FORM → WHATSAPP HANDOFF
       There is no backend: the form builds a message and opens
       WhatsApp, exactly as contact.formNote promises.
    ===================================================== */

    const LeadForm = (() => {
        const optionLabel = (select) => {
            const option = select && select.selectedOptions && select.selectedOptions[0];
            return option ? option.textContent.trim() : "";
        };

        function buildMessage(form, lang) {
            const t = (key) => I18N.translate(key, lang);
            const value = (name) => (form.elements[name] ? form.elements[name].value.trim() : "");

            return [
                `*${t("contact.waHeading")}*`,
                "",
                `${t("contact.formName")}: ${value("name")}`,
                `${t("contact.formBusiness")}: ${value("business")}`,
                `${t("contact.formType")}: ${optionLabel(form.elements.type)}`,
                `${t("contact.formGoal")}: ${optionLabel(form.elements.goal)}`,
                `${t("contact.formWhatsapp")}: ${value("phone")}`
            ].join("\n");
        }

        function init() {
            const form = document.getElementById("leadForm");
            if (!form) return;

            const status = document.getElementById("formStatus");
            let busy = false;

            form.addEventListener("submit", (event) => {
                event.preventDefault();
                if (busy) return;
                if (!form.checkValidity()) {
                    form.reportValidity();
                    return;
                }

                busy = true;
                const lang = I18N.getCurrentLanguage();
                const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(form, lang))}`;

                if (status) status.textContent = I18N.translate("contact.formStatus", lang);

                /* Popup blockers: fall back to navigating this tab. */
                const opened = window.open(url, "_blank");
                if (opened) opened.opener = null;
                else window.location.href = url;

                window.setTimeout(() => {
                    form.reset();
                    busy = false;
                }, 800);
                window.setTimeout(() => { if (status) status.textContent = ""; }, 6000);
            });
        }

        return { init };
    })();


    /* =====================================================
       IMAGE FALLBACK
       Capture-phase listener: <img> error events do not bubble.
    ===================================================== */

    function applyImageFallback(image) {
        if (!image || image.tagName !== "IMG" || image.dataset.fallbackApplied) return;
        image.dataset.fallbackApplied = "true";
        image.classList.add("asset-fallback");
        image.removeAttribute("srcset");
    }

    function initImageFallback() {
        document.addEventListener("error", (event) => applyImageFallback(event.target), true);

        /* Images that already failed before this script ran. */
        document.querySelectorAll("img").forEach((image) => {
            if (image.complete && image.currentSrc && image.naturalWidth === 0) applyImageFallback(image);
        });
    }


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    function init() {
        I18N.init();
        initLanguageButtons();
        MobileNav.init();
        ScrollReveal.init();
        OffscreenGate.init();
        ScrollNav.init();
        LeadForm.init();
    }

    function start() {
        initImageFallback();
        init();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
        start();
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.AuraMind = window.AuraMind || {};
    window.AuraMind.I18N = I18N;
    window.AuraMind.MobileNav = MobileNav;
})();
