"use client";
import { ContainerScroll } from "../components/ui/container-scroll-animation";
import { ContainerScrollMobile } from "../components/ui/container-scroll-mobile";

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-50">
      {/* 🖥️ Desktop + Tablet */}
      <div className="hidden md:block my-[-400px] py-[200px]">
        <ContainerScroll titleComponent={<> </>}>
          {" "}
          <div className="w-full max-w-[1200px] mx-auto">
            {" "}
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              {" "}
              <iframe
                src="https://www.youtube.com/embed/KR5fWm6JBds?autoplay=1&mute=1&controls=1&loop=1&playlist=KR5fWm6JBds"
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />{" "}
            </div>{" "}
          </div>{" "}
        </ContainerScroll>
      </div>

      {/* 📱 Mobile Only */}
      <div className="block md:hidden my-[-200px]">
        <ContainerScrollMobile titleComponent={<></>}>
          <div className="relative w-full overflow-hidden rounded-xl shadow-lg aspect-video">
  <iframe
    src="https://www.youtube.com/embed/KR5fWm6JBds?autoplay=1&controls=1&loop=1&playlist=KR5fWm6JBds"
    title="YouTube video player"
    className="absolute inset-0 w-full h-full rounded-xl"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    loading="lazy"
  />
</div>

        </ContainerScrollMobile>
      </div>
    </div>
  );
}
