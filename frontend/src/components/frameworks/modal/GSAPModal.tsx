import {
  useState,
  useCallback,
  type ReactElement,
  type ReactNode,
} from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface IGSAPModal {
  id?: string;
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export default function GSAPModal({
  id = "modal_overlay",
  open,
  children,
  onClose,
}: Readonly<IGSAPModal>): ReactElement {
  const [modalTimeline, setModalTimeline] = useState<gsap.core.Timeline>(
    gsap.timeline({})
  );

  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    open && openAnimateModal();
  }, [open]);

  function openAnimateModal(): void {
    let timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    timeline
      .to("#" + id, {
        scaleY: 0.01,
        x: 1,
        opacity: 1,
        display: "flex",
        duration: 0.4,
        zIndex: 999,
      })
      .to("#" + id, {
        scaleY: 1,
        background: "rgba(255,255,255,0.16)",
        duration: 0.6,
      })
      .to(
        "#" + id + " #second",
        { scaleY: 1, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .to(
        "#" + id + " #third",
        { scaleY: 1, opacity: 1, duration: 0.4 },
        "-=0.2"
      )
      .to(
        "#" + id + " #fourth",
        {
          background: "rgba(255,255,255,0.3)",
          border: "1px solid rgba(255,255,255,0.3)",
          duration: 0.8,
        },
        "-=0.4"
      );

    setModalTimeline(timeline);
  }

  const handleClose = useCallback(() => {
    modalTimeline.reverse();
    onClose?.();
  }, [modalTimeline, onClose]);

  return (
    <div
      id={id}
      className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 bg-primary/60 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
    >
      <div
        id="fourth"
        className="bg-primary/0 m-auto mb-0 sm:mb-auto p-3 border border-white/0 rounded-2xl shadow-sm"
      >
        <div
          id="second"
          className="p-4 sm:p-8 rounded-xl shadow-sm scale-y-0 opacity-0"
        >
          <div id="third" className="scale-y-0 opacity-0 items-center">
            <div className="card w-full bg-base-100 shadow-xl z-auto">
              <div className="card-body w-full">
                <div className="min-w-4/5 max-h-[calc(100vh_-_270px)] overflow-y-auto">
                  {children}
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={handleClose}>
                    닫기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
