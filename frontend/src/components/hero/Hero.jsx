import {
  Search,
  BookOpen,
  PlayCircle,
  Download,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  Mail,
  Lock,
  LayoutDashboard,
  Plus,
  Pencil,
  Trash2,
  Hamburger,
  HamburgerIcon,
  HamIcon,
} from "lucide-react";
import React from "react";
import "./hero.css";

const ayahs = [
  {
    text: "وَقُرْآنًا فَرَقْنَاهُ لِتَقْرَأَهُ عَلَى النَّاسِ عَلَىٰ مُكْثٍ",
    surah: "Al-Isra",
    ayah: 17,
  },

  {
    text: "إِنَّ هَٰذَا الْقُرْآنَ يَهْدِي لِلَّتِي هِيَ أَقْوَمُ",
    surah: "Al-Isra",
    ayah: 9,
  },

  {
    text: "وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ",
    surah: "Al-Isra",
    ayah: 82,
  },

  {
    text: "الم",
    surah: "Al-Baqarah",
    ayah: 1,
  },

  {
    text: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ",
    surah: "Al-Baqarah",
    ayah: 2,
  },

  {
    text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
    surah: "Al-Baqarah",
    ayah: 3,
  },

  {
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
    surah: "Ash-Sharh",
    ayah: 5,
  },

  {
    text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    surah: "Ash-Sharh",
    ayah: 6,
  },

  {
    text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
    surah: "Ta-Ha",
    ayah: 114,
  },

  {
    text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    surah: "Al-Baqarah",
    ayah: 153,
  },

  {
    text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    surah: "Al-Baqarah",
    ayah: 286,
  },

  {
    text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    surah: "At-Talaq",
    ayah: 3,
  },

  {
    text: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
    surah: "Ar-Ra'd",
    ayah: 11,
  },
];

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <span className="sp1">Free Always</span>
        <div className="title3">
          <h1 className="h1">
            Hidayah a place to <br />
            <span className="sp2"> search, read</span> and learn about deen
          </h1>
        </div>
        <p className="herop">
          Search the Quran ayah by ayah, read free books on Seerah and Islamic
          history, <br /> and watch lectures no fees, no accounts required to
          browse.
        </p>
        <div className="button">
          <div className="btn3">
            <Search className="herosearch" />
            <button className="search">Search The Quran</button>
          </div>
          <div className="btn4">
            <BookOpen className="herobook" />
            <button className="library">Browser The Library</button>
          </div>
        </div>
      </div>
      <div className="ayahs">
        <div className="ayah-tracker">
          {ayahs.map((ayah, idx) => {
            return (
              <div className="ayah">
                <h3 className="text"> {ayah.text} </h3>
                <p className="surah">
                  {" "}
                  - {ayah.surah} {ayah.ayah}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
