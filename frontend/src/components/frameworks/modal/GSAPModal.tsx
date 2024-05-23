import {
  useState,
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { sleep } from "@/util/comm-utils";
import { mergeClass } from "@/util/class-utils";

interface IGsapModal {
  open?: boolean;
  children: ReactNode;
  className?: string;
  onTest?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  onClose?: () => void;
}

export interface IGsapModalOut {
  modalSaveClose: () => void;
  modalClose: () => void;
}

const GsapModal = forwardRef(function GsapModal(
  {
    open,
    children,
    className,
    onTest,
    onSave,
    onDelete,
    onClose,
  }: Readonly<IGsapModal>,
  ref: Ref<IGsapModalOut>
): ReactElement {
  const [modalTimeline, setModalTimeline] = useState<gsap.core.Timeline>(
    gsap.timeline({})
  );
  const container = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        modalClose() {
          modalTimeline.reverse(1500);
        },
        async modalSaveClose() {
          modalTimeline.reverse(1500);
          await sleep(1500);
          onClose?.();
        },
      };
    },
    [modalTimeline, onClose]
  );

  const { contextSafe } = useGSAP(
    () => {
      if (open) {
        let timeline = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        const divElem = container.current as any;

        timeline
          .to(divElem, {
            scaleY: 0.01,
            x: 1,
            opacity: 1,
            display: "flex",
            duration: 0.4,
            zIndex: 999,
          })
          .to(divElem, {
            scaleY: 1,
            background: "rgba(255,255,255,0.16)",
            duration: 0.6,
          })
          .to(
            divElem.querySelector("#second"),
            { scaleY: 1, opacity: 1, duration: 0.6 },
            "-=0.4"
          )
          .to(
            divElem.querySelector("#third"),
            { scaleY: 1, opacity: 1, duration: 0.4 },
            "-=0.2"
          )
          .to(
            divElem.querySelector("#fourth"),
            {
              background: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.3)",
              duration: 0.8,
            },
            "-=0.4"
          );

        setModalTimeline(timeline);
      }
    },
    { scope: container, dependencies: [open] }
  );

  const handleSave = useCallback(() => {
    // modalTimeline.reverse();
    onSave?.();
  }, [onSave]);

  const handleDelete = useCallback(() => {
    // modalTimeline.reverse();
    onDelete?.();
  }, [onDelete]);

  const handleClose = contextSafe(async () => {
    modalTimeline.reverse(1500);
    await sleep(1500);
    onClose?.();
  });

  return (
    <div
      ref={container}
      className="bg-primary/80 absolute z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
    >
      <div
        id="fourth"
        className="bg-primary/0 m-auto mb-0 sm:mb-auto p-1 border border-white/0 rounded-2xl shadow-sm"
      >
        <div
          id="second"
          className="p-2 sm:p-3 rounded-xl shadow-sm scale-y-0 opacity-0"
        >
          <div id="third" className="scale-y-0 opacity-0 items-center">
            <div className="card w-full bg-base-100 shadow-xl z-auto">
              <div className="card-body gap-0 pt-4 pl-2 pr-2 pb-2">
                <div
                  className={mergeClass(
                    "min-w-4/5 max-h-[calc(100vh_-_50px)] overflow-y-auto",
                    className
                  )}
                >
                  {children}
                </div>
                <div className="card-actions justify-end mt-3">
                  {onTest && (
                    <button className="btn btn-sm btn-info" onClick={onTest}>
                      테스트
                    </button>
                  )}
                  {onSave && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleSave}
                    >
                      저장
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={handleDelete}
                    >
                      삭제
                    </button>
                  )}
                  <button
                    className="btn btn-sm btn-primary bg-primary/80 hover:bg-primary-focus"
                    onClick={handleClose}
                  >
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
});

export default GsapModal;
