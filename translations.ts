
import { TranslationSet, Language } from './types';

export const translations: Record<Language, TranslationSet> = {
  en: {
    nav: {
      courses: 'Academic Courses',
      workshops: 'Design Workshops',
      gallery: 'Student Work',
      about: 'Our Vision',
      join: 'Enrol Now'
    },
    hero: {
      badge: 'Redefining Architectural Education',
      title1: 'Empowering the',
      title2: 'Next Generation',
      description: 'The definitive platform for aspiring architects in Iraq and beyond. Master the tools of the future with expert-led studios and specialized curriculum.',
      explore: 'Explore Studios',
      showcase: 'View Projects'
    },
    stats: {
      activeStudents: 'Active Students',
      studios: 'Design Studios',
      mentors: 'Expert Mentors',
      success: 'Success Rate'
    },
    courses: {
      title: 'Academic Path',
      subtitle: 'Structured learning paths designed to take you from architectural fundamentals to advanced computational design.',
      viewAll: 'View All Courses',
      modules: 'Units',
      course1: 'Architectural Thinking',
      desc1: 'Master the core principles of space, form, and functionality in modern design.',
      price1: '$249',
      course2: 'Parametric Systems',
      desc2: 'Dive deep into algorithmic design using Rhino and Grasshopper.',
      price2: '$399',
      course3: 'Urban Narratives',
      desc3: 'Exploring the intersection of sociology and urban planning in modern cities.',
      price3: '$299'
    },
    workshops: {
      title: 'Skill Workshops',
      subtitle: 'Intensive short-term programs focusing on specific tools and artistic techniques.',
      register: 'Reserve Spot',
      maquette: 'Model Making',
      maquetteDesc: 'Physical craftsmanship meets modern fabrication techniques.',
      ai: 'AI in Architecture',
      aiDesc: 'Leveraging neural networks for generative design and visualization.',
      revit: 'BIM Mastery',
      revitDesc: 'Industry-standard Revit workflows for complex projects.',
      d5: 'D5 Render Pro',
      d5Desc: 'Cinematic real-time rendering for architectural storytelling.',
      photoshop: 'Digital Collage',
      photoshopDesc: 'Advanced post-production and presentation techniques.',
      davinci: 'Arch-Cinematography',
      davinciDesc: 'Video production and color grading for architectural films.'
    },
    about: {
      missionBadge: 'Founder & Visionary',
      title: 'Crafting the Future',
      bio: 'Architecture is not just about building structures; it is about building dreams and nurturing the intellect of those who will shape our world.',
      location: 'Baghdad Studio',
      founderName: 'Ahmed Kzar'
    },
    cta: {
      telegram: 'Join Our Community',
      title: 'Stay ahead of the curve.',
      description: 'Join our newsletter for weekly insights into architectural trends and early access to new workshops.',
      placeholder: 'Enter your email',
      subscribe: 'Join Now'
    },
    footer: {
      desc: 'Archein is the leading platform for architectural excellence, bridging the gap between academia and professional practice.',
      foundation: 'Academy',
      resources: 'Library',
      contact: 'Reach Out',
      rights: '© 2024 ARCHEIN. All rights reserved.',
      privacy: 'Privacy Protocol',
      terms: 'Academic Terms'
    }
  },
  ar: {
    nav: {
      courses: 'الدورات الأكاديمية',
      workshops: 'ورش العمل',
      gallery: 'أعمال الطلاب',
      about: 'رؤيتنا',
      join: 'انضم الآن'
    },
    hero: {
      badge: 'إعادة تعريف التعليم المعماري',
      title1: 'تمكين الجيل',
      title2: 'القادم من المصممين',
      description: 'المنصة النهائية للمعماريين الطموحين في العراق وخارجه. اتقن أدوات المستقبل مع استوديوهات يقودها خبراء ومنهج متخصص.',
      explore: 'اكتشف الاستوديوهات',
      showcase: 'عرض المشاريع'
    },
    stats: {
      activeStudents: 'طالب نشط',
      studios: 'استوديو تصميم',
      mentors: 'مرشد خبير',
      success: 'نسبة النجاح'
    },
    courses: {
      title: 'المسار الأكاديمي',
      subtitle: 'مسارات تعليمية منظمة مصممة لتأخذك من أساسيات الهندسة المعمارية إلى التصميم الحاسوبي المتقدم.',
      viewAll: 'عرض جميع الدورات',
      modules: 'وحدات',
      course1: 'التفكير المعماري',
      desc1: 'إتقان المبادئ الأساسية للمساحة والشكل والوظيفة في التصميم الحديث.',
      price1: '249$',
      course2: 'الأنظمة البارامترية',
      desc2: 'تعمق في التصميم الخوارزمي باستخدام Rhino و Grasshopper.',
      price2: '399$',
      course3: 'الروايات الحضرية',
      desc3: 'استكشاف التقاطع بين علم الاجتماع والتخطيط الحضري في المدن الحديثة.',
      price3: '299$'
    },
    workshops: {
      title: 'ورش المهارات',
      subtitle: 'برامج مكثفة قصيرة المدى تركز على أدوات وتقنيات فنية محددة.',
      register: 'احجز مقعدك',
      maquette: 'صنع الماكيت',
      maquetteDesc: 'الحرفية اليدوية تلتقي بتقنيات التصنيع الحديثة.',
      ai: 'الذكاء الاصطناعي',
      aiDesc: 'الاستفادة من الشبكات العصبية للتصميم التوليدي والتصور.',
      revit: 'إتقان الـ BIM',
      revitDesc: 'سير عمل Revit القياسي للمشاريع المعقدة.',
      d5: 'D5 Render الاحترافي',
      d5Desc: 'رندر سينمائي في الوقت الفعلي لسرد القصص المعمارية.',
      photoshop: 'الكولاج الرقمي',
      photoshopDesc: 'تقنيات ما بعد الإنتاج والعرض المتقدمة.',
      davinci: 'السينما المعمارية',
      davinciDesc: 'إنتاج الفيديو وتصحيح الألوان للأفلام المعمارية.'
    },
    about: {
      missionBadge: 'المؤسس والرؤية',
      title: 'صياغة المستقبل',
      bio: 'العمارة لا تتعلق فقط ببناء الهياكل؛ بل تتعلق ببناء الأحلام وتنمية عقول أولئك الذين سيشكلون عالمنا.',
      location: 'استوديو بغداد',
      founderName: 'أحمد كزار'
    },
    cta: {
      telegram: 'انضم لمجتمعنا',
      title: 'ابق في المقدمة دائماً.',
      description: 'اشترك في نشرتنا الإخبارية للحصول على رؤى أسبوعية حول الاتجاهات المعمارية والوصول المبكر للورش.',
      placeholder: 'أدخل بريدك الإلكتروني',
      subscribe: 'اشترك الآن'
    },
    footer: {
      desc: 'ARCHEIN هي المنصة الرائدة للتميز المعماري، حيث تجسر الفجوة بين الأكاديميا والممارسة المهنية.',
      foundation: 'الأكاديمية',
      resources: 'المكتبة',
      contact: 'تواصل معنا',
      rights: '© 2024 ARCHEIN. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط الأكاديمية'
    }
  }
};
