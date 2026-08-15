/* =========================================================
   AURAMIND — SITE LOGIC
   - EN / TR / AR internationalization (matches current HTML)
   - Browser language detection
   - localStorage persistence
   - Arabic RTL support
   - Desktop + mobile language switch
   - Mobile navigation
   - Scroll-reveal animation + active nav link tracking
   - Lead form → WhatsApp handoff
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


    /* =====================================================
       TRANSLATIONS
       Keys mirror every data-i18n / data-i18n-placeholder
       attribute found in index.html.
    ===================================================== */

    const translations = {
        en: {
            meta: {
                description: "AuraMind builds custom AI systems that automate customer conversations, capture leads, take orders, and streamline business workflows.",
                title: "AuraMind | AI Automation Agency"
            },
            nav: {
                services: "Services",
                industries: "Industries",
                howItWorks: "How It Works",
                about: "About",
                contact: "Contact",
                bookDemo: "Book a Demo",
                openMenu: "Open menu",
                closeMenu: "Close menu"
            },
            hero: {
                eyebrow: "AI BUSINESS AUTOMATION",
                h1_line1: "AI systems",
                h1_line2: "that work for your business.",
                description: "AuraMind builds custom AI systems that talk to customers, capture leads, take orders, remember conversations, and automate repetitive work — 24/7.",
                btnPrimary: "Book a Free Demo",
                btnSecondary: "See How It Works",
                trustAvailability: "AI availability",
                trustResponse: "Customer responses",
                trustCustom: "Built for your business",
                online: "Online",
                previewCustomerLabel: "Customer",
                previewCustomer: "Hi, I'd like to know if you deliver.",
                previewAiLabel: "AuraMind AI",
                previewAi: "Absolutely. I can help with delivery, orders, and any questions about the business.",
                previewAction1: "Conversation understood",
                previewAction2: "Customer information captured",
                previewAction3: "Next action triggered",
                floatTopTitle: "Customer captured",
                floatTopText: "Ready for your workflow",
                floatBottomTitle: "AI working",
                floatBottomText: "No manual reply required"
            },
            platforms: {
                label: "Built for the channels your customers already use"
            },
            problem: {
                kicker: "THE PROBLEM",
                title: "Your customers don't wait.",
                description: "Every unanswered message, delayed response, and repetitive task creates friction for your business.",
                card1Title: "Missed messages",
                card1Text: "Customers reach out when your team is busy, offline, or unavailable.",
                card2Title: "Slow replies",
                card2Text: "Delayed responses can turn interested customers into lost opportunities.",
                card3Title: "Manual work",
                card3Text: "Your team spends valuable time answering the same questions and processing repetitive requests.",
                card4Title: "Scattered information",
                card4Text: "Customer conversations, leads, orders, and follow-ups can become difficult to manage manually."
            },
            solution: {
                coreText: "Business System",
                item1Title: "Understand",
                item2Title: "Remember",
                item3Title: "Act",
                kicker: "THE AURAMIND SYSTEM",
                title: "More than a chatbot.",
                description: "AuraMind connects AI conversations with the workflows your business actually needs.",
                item1Text: "Understand customer intent and context.",
                item2Text: "Keep relevant customer information across conversations.",
                item3Text: "Trigger the right business workflow at the right time.",
                item4Title: "Hand Off",
                item4Text: "Bring your team in when human involvement is needed."
            },
            services: {
                kicker: "AI SOLUTIONS",
                title: "What can we automate?",
                description: "Custom AI systems designed around the way your business operates.",
                card1Title: "AI Customer Support",
                card1Text: "Answer customer questions instantly and keep conversations moving without putting more pressure on your team.",
                learnMore: "Explore solution →",
                card2Title: "AI Lead Capture",
                card2Text: "Turn customer conversations into structured leads your business can actually follow up with.",
                card3Title: "AI Ordering",
                card3Text: "Let customers place orders through natural conversation while your business receives the information it needs.",
                card4Title: "AI Follow-Up",
                card4Text: "Automatically continue conversations and follow up with customers who need another touchpoint.",
                card5Title: "AI Appointment Booking",
                card5Text: "Handle appointment requests and help customers find the next available step without manual back-and-forth.",
                card6Title: "Custom AI Agents",
                card6Text: "Build an AI workflow around the specific tasks, systems, and customer interactions your business needs."
            },
            industries: {
                kicker: "BUILT FOR REAL BUSINESSES",
                title: "AI that fits your industry.",
                description: "The right automation depends on how your customers interact with your business.",
                restaurantTitle: "Restaurants",
                restaurantText: "Customer support, ordering, delivery information, and automated order workflows.",
                realEstateTitle: "Real Estate",
                realEstateText: "Capture property inquiries, qualify leads, and keep prospects moving.",
                clinicTitle: "Clinics",
                clinicText: "Answer common questions, manage requests, and support appointment workflows.",
                retailTitle: "Retail & Local Business",
                retailText: "Automate everyday customer conversations, inquiries, and repetitive tasks."
            },
            steps: {
                kicker: "HOW IT WORKS",
                title: "From conversation to action.",
                description: "AuraMind connects the customer conversation to the business action that needs to happen next.",
                step1Title: "Customer reaches out",
                step1Text: "A customer starts a conversation through a channel your business already uses.",
                step2Title: "AI understands",
                step2Text: "AuraMind understands the request and responds naturally using the information available to it.",
                step3Title: "Information is remembered",
                step3Text: "Relevant customer information can be stored and used in future conversations.",
                step4Title: "Your business gets the result",
                step4Text: "Leads are captured, orders are processed, workflows are triggered, or your team is notified."
            },
            why: {
                kicker: "WHY AURAMIND",
                title: "AI that works the way your business works.",
                description: "Your business is unique. Your automation should be too.",
                card1Title: "Custom",
                card1Text: "Built around your business, customers, information, and workflows.",
                card2Title: "Always On",
                card2Text: "Give customers a way to get answers and start conversations outside business hours.",
                card3Title: "Connected",
                card3Text: "Connect customer conversations to the tools and workflows your business relies on.",
                card4Title: "Human When Needed",
                card4Text: "Automation should support your team, not prevent human involvement when it matters."
            },
            demo: {
                kicker: "SEE IT IN ACTION",
                title: "Your website should demonstrate your AI.",
                description: "Instead of only telling visitors what AuraMind does, let them experience how an AI business assistant can respond.",
                button: "Talk to AuraMind",
                online: "Online",
                message1: "What can you automate for my business?",
                message2: "I can help automate customer support, lead capture, orders, appointments, follow-ups, and other repetitive workflows.",
                suggestion1: "Customer support",
                suggestion2: "Lead capture",
                suggestion3: "Orders"
            },
            contact: {
                kicker: "LET'S BUILD SOMETHING",
                title: "What could your business automate?",
                description: "Tell us a little about your business and we'll help identify where AI can make the biggest difference.",
                formTitle: "Start your AI automation plan.",
                formSubtitle: "A few details are all we need to understand what you want to automate.",
                formName: "Your name",
                formBusiness: "Business name",
                formType: "Business type",
                formTypePlaceholder: "Select one",
                typeRestaurant: "Restaurant",
                typeRealEstate: "Real Estate",
                typeClinic: "Clinic",
                typeRetail: "Retail / Local Business",
                typeOther: "Other",
                formGoal: "What would you like to automate?",
                formGoalPlaceholder: "Select one",
                goalSupport: "Customer support",
                goalLeads: "Lead capture",
                goalOrders: "Orders",
                goalAppointments: "Appointments",
                goalOther: "Other",
                formWhatsapp: "WhatsApp number",
                formSubmit: "Request My Free AI Consultation",
                formNote: "Your request will open in WhatsApp so we can respond directly.",
                emailLabel: "Email",
                phoneLabel: "Phone / WhatsApp",
                locationLabel: "Location",
                locationValue: "Lefkoşa, Northern Cyprus",
                availabilityLabel: "Availability",
                availabilityValue: "Replies within a few hours, every day",
                followLabel: "Follow us",
                formNamePlaceholder: "Your name",
                formBusinessPlaceholder: "Your business",
                formWhatsappPlaceholder: "+90 ..."
            },
            footer: {
                tagline: "AI automation systems for modern businesses.",
                solutions: "Solutions",
                company: "Company",
                connect: "Connect",
                copyright: "© 2026 AuraMind AI. All rights reserved.",
                location: "Lefkoşa · Northern Cyprus"
            }
        },

        tr: {
            meta: {
                description: "AuraMind, işletmelerin müşteri görüşmelerini otomatikleştirmesine, potansiyel müşteri yakalamasına, sipariş almasına ve iş süreçlerini kolaylaştırmasına yardımcı olan özel yapay zeka sistemleri kurar.",
                title: "AuraMind | Yapay Zeka Otomasyon Ajansı"
            },
            nav: {
                services: "Hizmetler",
                industries: "Sektörler",
                howItWorks: "Nasıl Çalışır",
                about: "Hakkımızda",
                contact: "İletişim",
                bookDemo: "Demo Rezervasyonu",
                openMenu: "Menüyü aç",
                closeMenu: "Menüyü kapat"
            },
            hero: {
                eyebrow: "YAPAY ZEKA İLE İŞLETME OTOMASYONU",
                h1_line1: "İşletmeniz için çalışan",
                h1_line2: "yapay zeka sistemleri.",
                description: "AuraMind; müşterilerle konuşan, potansiyel müşteri yakalayan, sipariş alan, görüşmeleri hatırlayan ve tekrarlayan işleri otomatikleştiren özel yapay zeka sistemleri kurar — 7/24.",
                btnPrimary: "Ücretsiz Demo Alın",
                btnSecondary: "Nasıl Çalıştığını Görün",
                trustAvailability: "Yapay zeka müsaitliği",
                trustResponse: "Müşteri yanıtları",
                trustCustom: "İşletmenize özel kurulur",
                online: "Çevrimiçi",
                previewCustomerLabel: "Müşteri",
                previewCustomer: "Merhaba, teslimat yapıyor musunuz?",
                previewAiLabel: "AuraMind AI",
                previewAi: "Elbette. Teslimat, siparişler ve işletmemizle ilgili tüm sorularınızda yardımcı olabilirim.",
                previewAction1: "Görüşme anlaşıldı",
                previewAction2: "Müşteri bilgisi kaydedildi",
                previewAction3: "Sonraki adım tetiklendi",
                floatTopTitle: "Müşteri kaydedildi",
                floatTopText: "İş akışınız için hazır",
                floatBottomTitle: "Yapay zeka çalışıyor",
                floatBottomText: "Manuel yanıt gerekmiyor"
            },
            platforms: {
                label: "Müşterilerinizin zaten kullandığı kanallar için tasarlandı"
            },
            problem: {
                kicker: "SORUN",
                title: "Müşterileriniz beklemiyor.",
                description: "Yanıtsız kalan her mesaj, gecikmiş her yanıt ve tekrarlayan her görev işletmeniz için bir kayıp yaratır.",
                card1Title: "Kaçırılan mesajlar",
                card1Text: "Ekibiniz meşgulken, çevrimdışıyken veya müsait değilken müşteriler size ulaşmaya çalışır.",
                card2Title: "Yavaş yanıtlar",
                card2Text: "Gecikmiş yanıtlar ilgilenen müşterileri kaybedilen fırsatlara dönüştürebilir.",
                card3Title: "Manuel iş yükü",
                card3Text: "Ekibiniz aynı soruları yanıtlamak ve tekrarlayan talepleri işlemekle değerli zaman kaybediyor.",
                card4Title: "Dağınık bilgiler",
                card4Text: "Müşteri görüşmeleri, potansiyel müşteriler, siparişler ve takipler manuel olarak yönetilmesi zor hale gelebilir."
            },
            solution: {
                coreText: "İş Sistemi",
                item1Title: "Anla",
                item2Title: "Hatırla",
                item3Title: "Harekete Geç",
                kicker: "AURAMIND SİSTEMİ",
                title: "Bir sohbet robotundan fazlası.",
                description: "AuraMind, yapay zeka görüşmelerini işletmenizin gerçekten ihtiyaç duyduğu iş akışlarına bağlar.",
                item1Text: "Müşteri niyetini ve bağlamını anlar.",
                item2Text: "Görüşmeler arasında önemli müşteri bilgilerini saklar.",
                item3Text: "Doğru iş akışını doğru zamanda tetikler.",
                item4Title: "Devret",
                item4Text: "İnsan müdahalesi gerektiğinde ekibinizi devreye sokar."
            },
            services: {
                kicker: "YAPAY ZEKA ÇÖZÜMLERİ",
                title: "Neyi otomatikleştirebiliriz?",
                description: "İşletmenizin çalışma şekline göre tasarlanmış özel yapay zeka sistemleri.",
                card1Title: "Yapay Zeka Müşteri Desteği",
                card1Text: "Müşteri sorularını anında yanıtlayın ve ekibinize daha fazla yük bindirmeden görüşmeleri sürdürün.",
                learnMore: "Çözümü keşfedin →",
                card2Title: "Yapay Zeka ile Potansiyel Müşteri Yakalama",
                card2Text: "Müşteri görüşmelerini, işletmenizin gerçekten takip edebileceği düzenli potansiyel müşterilere dönüştürün.",
                card3Title: "Yapay Zeka ile Sipariş Alma",
                card3Text: "Müşterilerin doğal bir sohbetle sipariş vermesine izin verirken işletmeniz ihtiyaç duyduğu bilgileri alsın.",
                card4Title: "Yapay Zeka ile Takip",
                card4Text: "Görüşmeleri otomatik olarak sürdürün ve başka bir temasa ihtiyaç duyan müşterileri takip edin.",
                card5Title: "Yapay Zeka ile Randevu Alma",
                card5Text: "Randevu taleplerini yönetin ve müşterilerin manuel yazışma olmadan bir sonraki adımı bulmasına yardımcı olun.",
                card6Title: "Özel Yapay Zeka Ajanları",
                card6Text: "İşletmenizin ihtiyaç duyduğu özel görevler, sistemler ve müşteri etkileşimleri etrafında bir yapay zeka iş akışı kurun."
            },
            industries: {
                kicker: "GERÇEK İŞLETMELER İÇİN",
                title: "Sektörünüze uygun yapay zeka.",
                description: "Doğru otomasyon, müşterilerinizin işletmenizle nasıl etkileşime girdiğine bağlıdır.",
                restaurantTitle: "Restoranlar",
                restaurantText: "Müşteri desteği, sipariş alma, teslimat bilgisi ve otomatik sipariş iş akışları.",
                realEstateTitle: "Emlak",
                realEstateText: "Emlak sorularını yakalayın, potansiyel müşterileri niteleyin ve süreci ilerletin.",
                clinicTitle: "Klinikler",
                clinicText: "Sık sorulan soruları yanıtlayın, talepleri yönetin ve randevu süreçlerini destekleyin.",
                retailTitle: "Perakende ve Yerel İşletmeler",
                retailText: "Günlük müşteri görüşmelerini, soruları ve tekrarlayan görevleri otomatikleştirin."
            },
            steps: {
                kicker: "NASIL ÇALIŞIR",
                title: "Görüşmeden harekete.",
                description: "AuraMind, müşteri görüşmesini bir sonraki adımda gerçekleşmesi gereken iş eylemine bağlar.",
                step1Title: "Müşteri size ulaşır",
                step1Text: "Bir müşteri, işletmenizin zaten kullandığı bir kanal üzerinden görüşme başlatır.",
                step2Title: "Yapay zeka anlar",
                step2Text: "AuraMind talebi anlar ve elindeki bilgileri kullanarak doğal bir şekilde yanıt verir.",
                step3Title: "Bilgi hatırlanır",
                step3Text: "Önemli müşteri bilgileri saklanabilir ve gelecekteki görüşmelerde kullanılabilir.",
                step4Title: "İşletmeniz sonucu alır",
                step4Text: "Potansiyel müşteriler yakalanır, siparişler işlenir, iş akışları tetiklenir veya ekibiniz bilgilendirilir."
            },
            why: {
                kicker: "NEDEN AURAMIND",
                title: "İşletmenizin çalışma şekline uygun yapay zeka.",
                description: "İşletmeniz benzersiz. Otomasyonunuz da öyle olmalı.",
                card1Title: "Kişiye Özel",
                card1Text: "İşletmeniz, müşterileriniz, bilgileriniz ve iş akışlarınız etrafında kurulur.",
                card2Title: "Her Zaman Açık",
                card2Text: "Müşterilere mesai saatleri dışında da yanıt alma ve görüşme başlatma imkanı sunar.",
                card3Title: "Bağlantılı",
                card3Text: "Müşteri görüşmelerini işletmenizin güvendiği araçlara ve iş akışlarına bağlar.",
                card4Title: "Gerektiğinde İnsan Desteği",
                card4Text: "Otomasyon ekibinizi desteklemeli, önemli olduğunda insan müdahalesini engellememelidir."
            },
            demo: {
                kicker: "CANLI ÖRNEK",
                title: "Web siteniz yapay zekanızı göstermeli.",
                description: "Ziyaretçilere AuraMind'ın ne yaptığını sadece anlatmak yerine, bir yapay zeka iş asistanının nasıl yanıt verdiğini deneyimlesinler.",
                button: "AuraMind ile Konuşun",
                online: "Çevrimiçi",
                message1: "İşletmem için neleri otomatikleştirebilirsiniz?",
                message2: "Müşteri desteği, potansiyel müşteri yakalama, siparişler, randevular, takipler ve diğer tekrarlayan iş akışlarını otomatikleştirmenize yardımcı olabilirim.",
                suggestion1: "Müşteri desteği",
                suggestion2: "Potansiyel müşteri yakalama",
                suggestion3: "Siparişler"
            },
            contact: {
                kicker: "BİR ŞEYLER İNŞA EDELİM",
                title: "İşletmeniz neyi otomatikleştirebilir?",
                description: "İşletmeniz hakkında birkaç bilgi verin, yapay zekanın en büyük farkı nerede yaratabileceğini birlikte belirleyelim.",
                formTitle: "Yapay zeka otomasyon planınızı başlatın.",
                formSubtitle: "Neyi otomatikleştirmek istediğinizi anlamamız için birkaç detay yeterli.",
                formName: "Adınız",
                formBusiness: "İşletme adı",
                formType: "İşletme türü",
                formTypePlaceholder: "Birini seçin",
                typeRestaurant: "Restoran",
                typeRealEstate: "Emlak",
                typeClinic: "Klinik",
                typeRetail: "Perakende / Yerel İşletme",
                typeOther: "Diğer",
                formGoal: "Neyi otomatikleştirmek istersiniz?",
                formGoalPlaceholder: "Birini seçin",
                goalSupport: "Müşteri desteği",
                goalLeads: "Potansiyel müşteri yakalama",
                goalOrders: "Siparişler",
                goalAppointments: "Randevular",
                goalOther: "Diğer",
                formWhatsapp: "WhatsApp numarası",
                formSubmit: "Ücretsiz Yapay Zeka Danışmanlığı İsteyin",
                formNote: "Talebiniz doğrudan yanıt verebilmemiz için WhatsApp'ta açılacaktır.",
                emailLabel: "E-posta",
                phoneLabel: "Telefon / WhatsApp",
                locationLabel: "Konum",
                locationValue: "Lefkoşa, Kuzey Kıbrıs",
                availabilityLabel: "Müsaitlik",
                availabilityValue: "Her gün birkaç saat içinde yanıt veriyoruz",
                followLabel: "Bizi takip edin",
                formNamePlaceholder: "Adınız",
                formBusinessPlaceholder: "İşletmeniz",
                formWhatsappPlaceholder: "+90 ..."
            },
            footer: {
                tagline: "Modern işletmeler için yapay zeka otomasyon sistemleri.",
                solutions: "Çözümler",
                company: "Şirket",
                connect: "Bağlantı",
                copyright: "© 2026 AuraMind AI. Tüm hakları saklıdır.",
                location: "Lefkoşa · Kuzey Kıbrıs"
            }
        },

        ar: {
            meta: {
                description: "تبني AuraMind أنظمة ذكاء اصطناعي مخصصة تُؤتمت محادثات العملاء، وترصد العملاء المحتملين، وتستقبل الطلبات، وتُبسّط سير عمل الأعمال.",
                title: "AuraMind | وكالة أتمتة بالذكاء الاصطناعي"
            },
            nav: {
                services: "الخدمات",
                industries: "القطاعات",
                howItWorks: "كيف نعمل",
                about: "من نحن",
                contact: "تواصل معنا",
                bookDemo: "احجز عرضًا تجريبيًا",
                openMenu: "فتح القائمة",
                closeMenu: "إغلاق القائمة"
            },
            hero: {
                eyebrow: "أتمتة الأعمال بالذكاء الاصطناعي",
                h1_line1: "أنظمة ذكاء اصطناعي",
                h1_line2: "تعمل لصالح عملك.",
                description: "تبني AuraMind أنظمة ذكاء اصطناعي مخصصة تتحدث مع العملاء، وترصد العملاء المحتملين، وتستقبل الطلبات، وتتذكر المحادثات، وتؤتمت الأعمال المتكررة — على مدار الساعة.",
                btnPrimary: "احجز عرضًا تجريبيًا مجانيًا",
                btnSecondary: "شاهد كيف نعمل",
                trustAvailability: "توفر الذكاء الاصطناعي",
                trustResponse: "ردود العملاء",
                trustCustom: "مصمم خصيصًا لعملك",
                online: "متصل",
                previewCustomerLabel: "العميل",
                previewCustomer: "مرحبًا، هل تقدمون خدمة التوصيل؟",
                previewAiLabel: "AuraMind AI",
                previewAi: "بالتأكيد. يمكنني مساعدتك في التوصيل والطلبات وأي أسئلة حول العمل.",
                previewAction1: "تم فهم المحادثة",
                previewAction2: "تم رصد بيانات العميل",
                previewAction3: "تم تفعيل الإجراء التالي",
                floatTopTitle: "تم رصد العميل",
                floatTopText: "جاهز لسير عملك",
                floatBottomTitle: "الذكاء الاصطناعي يعمل",
                floatBottomText: "لا حاجة لرد يدوي"
            },
            platforms: {
                label: "مصمم للقنوات التي يستخدمها عملاؤك بالفعل"
            },
            problem: {
                kicker: "المشكلة",
                title: "عملاؤك لا ينتظرون.",
                description: "كل رسالة دون رد، وكل استجابة متأخرة، وكل مهمة متكررة تخلق عائقًا أمام عملك.",
                card1Title: "رسائل فائتة",
                card1Text: "يتواصل العملاء معك بينما فريقك مشغول أو غير متصل أو غير متاح.",
                card2Title: "ردود بطيئة",
                card2Text: "الردود المتأخرة قد تحول العملاء المهتمين إلى فرص ضائعة.",
                card3Title: "عمل يدوي",
                card3Text: "يقضي فريقك وقتًا ثمينًا في الإجابة عن نفس الأسئلة ومعالجة الطلبات المتكررة.",
                card4Title: "معلومات متناثرة",
                card4Text: "قد يصبح من الصعب إدارة محادثات العملاء والعملاء المحتملين والطلبات والمتابعات يدويًا."
            },
            solution: {
                coreText: "نظام أعمال",
                item1Title: "يفهم",
                item2Title: "يتذكر",
                item3Title: "يتصرف",
                kicker: "نظام AuraMind",
                title: "أكثر من مجرد روبوت محادثة.",
                description: "يربط AuraMind محادثات الذكاء الاصطناعي بسير العمل الذي يحتاجه عملك فعليًا.",
                item1Text: "يفهم نية العميل وسياق حديثه.",
                item2Text: "يحتفظ بمعلومات العميل المهمة عبر المحادثات.",
                item3Text: "يفعّل سير العمل المناسب في الوقت المناسب.",
                item4Title: "التسليم للفريق",
                item4Text: "يُشرك فريقك عندما يكون التدخل البشري ضروريًا."
            },
            services: {
                kicker: "حلول الذكاء الاصطناعي",
                title: "ماذا يمكننا أن نؤتمت؟",
                description: "أنظمة ذكاء اصطناعي مخصصة مصممة حول طريقة عمل شركتك.",
                card1Title: "دعم العملاء بالذكاء الاصطناعي",
                card1Text: "أجب عن أسئلة العملاء فورًا وحافظ على استمرار المحادثات دون إضافة عبء على فريقك.",
                learnMore: "اكتشف الحل ←",
                card2Title: "رصد العملاء المحتملين بالذكاء الاصطناعي",
                card2Text: "حوّل محادثات العملاء إلى عملاء محتملين منظمين يمكن لعملك متابعتهم فعليًا.",
                card3Title: "الطلب عبر الذكاء الاصطناعي",
                card3Text: "دع العملاء يقدمون طلباتهم عبر محادثة طبيعية بينما يحصل عملك على المعلومات التي يحتاجها.",
                card4Title: "المتابعة بالذكاء الاصطناعي",
                card4Text: "استمر في المحادثات تلقائيًا وتابع مع العملاء الذين يحتاجون إلى نقطة تواصل أخرى.",
                card5Title: "حجز المواعيد بالذكاء الاصطناعي",
                card5Text: "أدر طلبات المواعيد وساعد العملاء في إيجاد الخطوة التالية دون تواصل يدوي متكرر.",
                card6Title: "وكلاء ذكاء اصطناعي مخصصون",
                card6Text: "ابنِ سير عمل ذكاء اصطناعي حول المهام والأنظمة وتفاعلات العملاء التي يحتاجها عملك تحديدًا."
            },
            industries: {
                kicker: "مصمم لشركات حقيقية",
                title: "ذكاء اصطناعي يناسب قطاعك.",
                description: "الأتمتة المناسبة تعتمد على طريقة تفاعل عملائك مع عملك.",
                restaurantTitle: "المطاعم",
                restaurantText: "دعم العملاء، استقبال الطلبات، معلومات التوصيل، وسير عمل الطلبات الآلي.",
                realEstateTitle: "العقارات",
                realEstateText: "رصد استفسارات العقارات، وتأهيل العملاء المحتملين، والحفاظ على تقدم الصفقات.",
                clinicTitle: "العيادات",
                clinicText: "الإجابة عن الأسئلة الشائعة، وإدارة الطلبات، ودعم سير عمل المواعيد.",
                retailTitle: "التجزئة والأعمال المحلية",
                retailText: "أتمتة محادثات العملاء اليومية والاستفسارات والمهام المتكررة."
            },
            steps: {
                kicker: "كيف نعمل",
                title: "من المحادثة إلى الإجراء.",
                description: "يربط AuraMind محادثة العميل بإجراء العمل الذي يجب أن يحدث بعد ذلك.",
                step1Title: "يتواصل معك العميل",
                step1Text: "يبدأ العميل محادثة عبر قناة يستخدمها عملك بالفعل.",
                step2Title: "يفهم الذكاء الاصطناعي",
                step2Text: "يفهم AuraMind الطلب ويرد بشكل طبيعي باستخدام المعلومات المتاحة له.",
                step3Title: "يتم تذكر المعلومات",
                step3Text: "يمكن حفظ معلومات العميل المهمة واستخدامها في المحادثات المستقبلية.",
                step4Title: "يحصل عملك على النتيجة",
                step4Text: "يتم رصد العملاء المحتملين، ومعالجة الطلبات، وتفعيل سير العمل، أو إشعار فريقك."
            },
            why: {
                kicker: "لماذا AuraMind",
                title: "ذكاء اصطناعي يعمل بالطريقة التي يعمل بها عملك.",
                description: "عملك فريد من نوعه. وأتمتتك يجب أن تكون كذلك أيضًا.",
                card1Title: "مخصص",
                card1Text: "مبني حول عملك وعملائك ومعلوماتك وسير عملك.",
                card2Title: "متاح دائمًا",
                card2Text: "يمنح العملاء طريقة للحصول على إجابات وبدء محادثات خارج ساعات العمل.",
                card3Title: "متصل",
                card3Text: "يربط محادثات العملاء بالأدوات وسير العمل التي يعتمد عليها عملك.",
                card4Title: "تدخل بشري عند الحاجة",
                card4Text: "يجب أن تدعم الأتمتة فريقك، لا أن تمنع التدخل البشري عندما يكون مهمًا."
            },
            demo: {
                kicker: "شاهد الأمر عمليًا",
                title: "موقعك يجب أن يُظهر قدرة ذكائك الاصطناعي.",
                description: "بدلاً من إخبار الزوار فقط بما تفعله AuraMind، دعهم يختبرون كيف يمكن لمساعد أعمال ذكي أن يرد.",
                button: "تحدث مع AuraMind",
                online: "متصل",
                message1: "ماذا يمكنكم أتمتته لعملي؟",
                message2: "يمكنني المساعدة في أتمتة دعم العملاء، ورصد العملاء المحتملين، والطلبات، والمواعيد، والمتابعات، وسير العمل المتكرر الآخر.",
                suggestion1: "دعم العملاء",
                suggestion2: "رصد العملاء المحتملين",
                suggestion3: "الطلبات"
            },
            contact: {
                kicker: "لنبنِ شيئًا معًا",
                title: "ماذا يمكن لعملك أن يؤتمت؟",
                description: "أخبرنا قليلاً عن عملك وسنساعدك في تحديد أين يمكن للذكاء الاصطناعي أن يُحدث أكبر فرق.",
                formTitle: "ابدأ خطة أتمتة الذكاء الاصطناعي الخاصة بك.",
                formSubtitle: "بضعة تفاصيل فقط تكفي لنفهم ما تريد أتمتته.",
                formName: "اسمك",
                formBusiness: "اسم العمل",
                formType: "نوع العمل",
                formTypePlaceholder: "اختر واحدًا",
                typeRestaurant: "مطعم",
                typeRealEstate: "عقارات",
                typeClinic: "عيادة",
                typeRetail: "تجزئة / عمل محلي",
                typeOther: "أخرى",
                formGoal: "ماذا تود أن تؤتمت؟",
                formGoalPlaceholder: "اختر واحدًا",
                goalSupport: "دعم العملاء",
                goalLeads: "رصد العملاء المحتملين",
                goalOrders: "الطلبات",
                goalAppointments: "المواعيد",
                goalOther: "أخرى",
                formWhatsapp: "رقم واتساب",
                formSubmit: "اطلب استشارتك المجانية للذكاء الاصطناعي",
                formNote: "سيُفتح طلبك في واتساب حتى نتمكن من الرد عليك مباشرة.",
                emailLabel: "البريد الإلكتروني",
                phoneLabel: "الهاتف / واتساب",
                locationLabel: "الموقع",
                locationValue: "لفكوشا، شمال قبرص",
                availabilityLabel: "التوفر",
                availabilityValue: "نرد خلال ساعات قليلة كل يوم",
                followLabel: "تابعنا",
                formNamePlaceholder: "اسمك",
                formBusinessPlaceholder: "اسم عملك",
                formWhatsappPlaceholder: "+90 ..."
            },
            footer: {
                tagline: "أنظمة أتمتة بالذكاء الاصطناعي للشركات الحديثة.",
                solutions: "الحلول",
                company: "الشركة",
                connect: "تواصل",
                copyright: "© 2026 AuraMind AI. جميع الحقوق محفوظة.",
                location: "لفكوشا · شمال قبرص"
            }
        }
    };


    /* =====================================================
       I18N ENGINE
    ===================================================== */

    const I18N = (() => {
        let currentLang = DEFAULT_LANG;

        function getNested(object, path) {
            return path.split(".").reduce((value, key) => {
                return value && value[key] !== undefined ? value[key] : undefined;
            }, object);
        }

        function translate(key, lang = currentLang) {
            const dictionary = translations[lang] || translations[DEFAULT_LANG];
            const translated = getNested(dictionary, key);

            if (translated !== undefined) {
                return translated;
            }

            const fallback = getNested(translations[DEFAULT_LANG], key);

            if (fallback !== undefined) {
                console.warn(`[AuraMind i18n] Missing "${key}" for "${lang}". Using English fallback.`);
                return fallback;
            }

            console.warn(`[AuraMind i18n] Translation key "${key}" does not exist.`);
            return "";
        }

        function detectBrowserLanguage() {
            const browserLanguages =
                Array.isArray(navigator.languages) && navigator.languages.length
                    ? navigator.languages
                    : [navigator.language || DEFAULT_LANG];

            for (const language of browserLanguages) {
                const code = String(language).slice(0, 2).toLowerCase();
                if (SUPPORTED_LANGS.includes(code)) {
                    return code;
                }
            }

            return DEFAULT_LANG;
        }

        function updateMeta(lang) {
            document.title = translate("meta.title", lang);

            const description = document.querySelector('meta[name="description"]');
            if (description) {
                description.setAttribute("content", translate("meta.description", lang));
            }

            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) {
                ogTitle.setAttribute("content", translate("meta.title", lang));
            }
        }

        function updateDOM(lang) {
            // Text / inner content, or a specific attribute via data-i18n-attr
            document.querySelectorAll("[data-i18n]").forEach((element) => {
                const key = element.getAttribute("data-i18n");
                if (!key) return;

                const translatedText = translate(key, lang);
                const attribute = element.getAttribute("data-i18n-attr");

                if (attribute) {
                    element.setAttribute(attribute, translatedText);
                } else {
                    element.textContent = translatedText;
                }
            });

            // Placeholder-only translations (form inputs)
            document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
                const key = element.getAttribute("data-i18n-placeholder");
                if (!key) return;
                element.setAttribute("placeholder", translate(key, lang));
            });

            const isRTL = RTL_LANGS.includes(lang);

            document.documentElement.lang = lang;
            document.documentElement.dir = isRTL ? "rtl" : "ltr";

            updateMeta(lang);
            updateLanguageButtons(lang);
        }

        function updateLanguageButtons(lang) {
            document.querySelectorAll(".lang-option").forEach((button) => {
                const buttonLanguage = button.getAttribute("data-lang");
                const active = buttonLanguage === lang;

                button.classList.toggle("is-active", active);
                button.setAttribute("aria-current", active ? "true" : "false");
            });
        }

        function saveLanguage(lang) {
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch (error) {
                console.warn("[AuraMind] Could not save language preference.", error);
            }
        }

        function loadSavedLanguage() {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved && SUPPORTED_LANGS.includes(saved)) {
                    return saved;
                }
            } catch (error) {
                console.warn("[AuraMind] Could not read saved language.", error);
            }
            return null;
        }

        function setLanguage(lang, { persist = true } = {}) {
            if (!SUPPORTED_LANGS.includes(lang)) {
                lang = DEFAULT_LANG;
            }

            currentLang = lang;
            updateDOM(lang);

            if (persist) {
                saveLanguage(lang);
            }

            document.dispatchEvent(
                new CustomEvent("auramind:languagechange", { detail: { lang } })
            );
        }

        function init() {
            const saved = loadSavedLanguage();
            const language = saved || detectBrowserLanguage();
            setLanguage(language, { persist: !saved });
        }

        function getCurrentLanguage() {
            return currentLang;
        }

        return { init, setLanguage, translate, getCurrentLanguage };
    })();


    /* =====================================================
       LANGUAGE BUTTONS
       Handles BOTH the desktop and mobile .lang-switch groups.
    ===================================================== */

    function initLanguageButtons() {
        document.querySelectorAll(".lang-option").forEach((button) => {
            button.addEventListener("click", () => {
                const language = button.getAttribute("data-lang");

                if (!SUPPORTED_LANGS.includes(language)) {
                    console.warn(`[AuraMind] Unsupported language: ${language}`);
                    return;
                }

                I18N.setLanguage(language);
                MobileNav.close();
            });
        });
    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const ScrollReveal = (() => {
        function init() {
            const items = document.querySelectorAll("[data-animate]");
            if (!items.length) return;

            if (!("IntersectionObserver" in window)) {
                items.forEach((element) => element.classList.add("is-revealed"));
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-revealed");
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -60px 0px"
                }
            );

            items.forEach((element) => observer.observe(element));
        }

        return { init };
    })();


    /* =====================================================
       SCROLL-AWARE NAVBAR + ACTIVE LINK TRACKING
    ===================================================== */

    const ScrollNav = (() => {
        let navbar = null;

        function handleScroll() {
            if (!navbar) return;
            navbar.classList.toggle("is-scrolled", window.scrollY > 12);
        }

        function setupActiveLinks() {
            const sections = Array.from(document.querySelectorAll("main section[id]"));
            const links = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

            if (!sections.length || !links.length || !("IntersectionObserver" in window)) {
                return;
            }

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        const id = entry.target.getAttribute("id");

                        links.forEach((link) => {
                            const matches = link.getAttribute("href") === `#${id}`;
                            link.classList.toggle("is-active", matches);
                        });
                    });
                },
                {
                    threshold: 0.5,
                    rootMargin: "-80px 0px -40% 0px"
                }
            );

            sections.forEach((section) => observer.observe(section));
        }

        function init() {
            navbar = document.querySelector(".navbar");
            if (!navbar) return;

            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
            setupActiveLinks();
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

        function updateMobileMenuLabel() {
            if (!button) return;

            const key = isOpen ? "nav.closeMenu" : "nav.openMenu";
            button.setAttribute("aria-label", I18N.translate(key, I18N.getCurrentLanguage()));
        }

        function open() {
            if (!button || !panel) return;

            isOpen = true;
            panel.classList.add("open");
            button.classList.add("is-active");
            button.setAttribute("aria-expanded", "true");
            panel.setAttribute("aria-hidden", "false");
            document.body.classList.add("menu-open");
            updateMobileMenuLabel();
        }

        function close() {
            if (!button || !panel) return;

            isOpen = false;
            panel.classList.remove("open");
            button.classList.remove("is-active");
            button.setAttribute("aria-expanded", "false");
            panel.setAttribute("aria-hidden", "true");
            document.body.classList.remove("menu-open");
            updateMobileMenuLabel();
        }

        function toggle() {
            if (isOpen) {
                close();
            } else {
                open();
            }
        }

        function handleOutsideClick(event) {
            if (!isOpen) return;
            if (panel.contains(event.target) || button.contains(event.target)) return;
            close();
        }

        function handleKeydown(event) {
            if (event.key === "Escape" && isOpen) {
                close();
                button.focus();
            }
        }

        function handleResize() {
            if (window.innerWidth > 950 && isOpen) {
                close();
            }
        }

        function init() {
            if (initialized) return;

            button = document.getElementById("mobileMenuButton");
            panel = document.getElementById("mobileNavLinks");

            if (!button || !panel) {
                console.warn("[AuraMind] Mobile navigation elements were not found.");
                return;
            }

            initialized = true;

            button.addEventListener("click", toggle);

            panel.querySelectorAll("a").forEach((link) => {
                link.addEventListener("click", close);
            });

            document.addEventListener("click", handleOutsideClick);
            document.addEventListener("keydown", handleKeydown);
            window.addEventListener("resize", handleResize);

            document.addEventListener("auramind:languagechange", updateMobileMenuLabel);
        }

        return { init, open, close, toggle };
    })();


    /* =====================================================
       LEAD FORM → WHATSAPP HANDOFF
       The form has no backend, so we build a formatted
       WhatsApp message from the fields and open it in a new
       tab, exactly as contact.formNote promises.
    ===================================================== */

    const LeadForm = (() => {
        function buildMessage(data, lang) {
            const t = (key) => I18N.translate(key, lang);
            const lines = [
                `*${t("contact.formTitle")}*`,
                "",
                `${t("contact.formName")}: ${data.name}`,
                `${t("contact.formBusiness")}: ${data.business}`,
                `${t("contact.formType")}: ${data.type}`,
                `${t("contact.formGoal")}: ${data.goal}`,
                `${t("contact.formWhatsapp")}: ${data.phone}`
            ];
            return lines.join("\n");
        }

        function handleSubmit(event) {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);
            const data = {
                name: (formData.get("name") || "").toString().trim(),
                business: (formData.get("business") || "").toString().trim(),
                type: (formData.get("type") || "").toString().trim(),
                goal: (formData.get("goal") || "").toString().trim(),
                phone: (formData.get("phone") || "").toString().trim()
            };

            if (!data.name || !data.business || !data.type || !data.goal || !data.phone) {
                form.reportValidity();
                return;
            }

            const lang = I18N.getCurrentLanguage();
            const message = buildMessage(data, lang);
            const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            window.open(url, "_blank", "noopener,noreferrer");
            form.reset();
        }

        function init() {
            const form = document.getElementById("leadForm");
            if (!form) return;

            form.addEventListener("submit", handleSubmit);
        }

        return { init };
    })();


    /* =====================================================
       INITIALIZATION
    ===================================================== */

    function init() {
        I18N.init();
        initLanguageButtons();
        MobileNav.init();
        ScrollReveal.init();
        ScrollNav.init();
        LeadForm.init();

        console.info(`[AuraMind] Initialized successfully. Language: ${I18N.getCurrentLanguage()}`);
    }


    /* =====================================================
       DOM READY
    ===================================================== */

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }


    /* =====================================================
       PUBLIC API
    ===================================================== */

    window.AuraMind = window.AuraMind || {};
    window.AuraMind.I18N = I18N;
    window.AuraMind.MobileNav = MobileNav;
})();
