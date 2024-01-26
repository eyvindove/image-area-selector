import { useContext, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { ImageAreaSelectorContext } from "@/context";
import { fabric } from "fabric";
import { Transform, type IEvent } from "fabric/fabric-impl";
import { deleteIcon } from "@/config";
import type { DataType } from "@/types";

const RECT_DEFAULT_SIZE = 50;
const RECT_MARGIN = 4;

const img = document.createElement("img");
img.src = deleteIcon;

const ImageSelectorContainer = styled.div`
  position: absolute;
`;

export default function ImageSelector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstance = useRef<fabric.Canvas>();

  const { viewerSize, dataList, setDataList } = useContext(
    ImageAreaSelectorContext,
  );

  function getCurrentObjectsList() {
    const list = canvasInstance.current?.getObjects();
    const dataList =
      list?.map((item) => ({
        x: Math.ceil(item.aCoords?.tl.x ?? 0),
        y: Math.ceil(item.aCoords?.tl.y ?? 0),
        width: Math.ceil(
          (item.aCoords?.tr.x ?? 0) - (item.aCoords?.tl.x ?? 0) - 1,
        ),
        height: Math.ceil(
          (item.aCoords?.bl.y ?? 0) - (item.aCoords?.tl.y ?? 0) - 1,
        ),
      })) ?? [];

    return dataList;
  }

  useEffect(() => {
    fabric.Object.prototype.cornerColor = "blue";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerSize = 8;
    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: 12,
      offsetY: 12,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function deleteObject(_eventData: MouseEvent, _transform: Transform) {
      // const target = transform.target;
      // const canvas = target.canvas;
      // canvas?.remove(target);

      const prevDataList = getCurrentObjectsList();
      setDataList([...prevDataList.slice(0, -1)]);

      return false;
    }

    function renderIcon(
      ctx: CanvasRenderingContext2D,
      left: number,
      top: number,
      _styleOverride: unknown,
      fabricObject: fabric.Object,
    ) {
      const size = 24;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject?.angle ?? 0));
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    }

    canvasInstance.current = new fabric.Canvas(canvasRef.current, {
      width: viewerSize.width,
      height: viewerSize.height,
    });

    function detectIsOverflow(target: DataType) {
      return (
        target.x < 0 ||
        target.x + target.width > viewerSize.width ||
        target.y < 0 ||
        target.y + target.height > viewerSize.height
      );
    }

    function detectIsOverlapped(target: DataType, first: boolean = false) {
      const targetDataList = first ? dataList : dataList.slice(0, -1);

      return targetDataList.find((data) => {
        const compareX =
          target.x + target.width >= data.x - RECT_MARGIN &&
          target.x <= data.x + data.width + RECT_MARGIN;
        const compareY =
          target.y + target.height >= data.y - RECT_MARGIN &&
          target.y <= data.y + data.height + RECT_MARGIN;

        return compareX && compareY;
      });
    }

    canvasInstance.current?.on("mouse:down", (e: IEvent<MouseEvent>) => {
      console.log("[mouse:down] e:", e);
      const target = {
        x: Math.ceil(e.absolutePointer?.x ?? 0),
        y: Math.ceil(e.absolutePointer?.y ?? 0),
        width: RECT_DEFAULT_SIZE,
        height: RECT_DEFAULT_SIZE,
      };

      if (!e.target) {
        const isOverflow = detectIsOverflow(target);
        const isOverlapped = detectIsOverlapped(target, true);
        if (!isOverlapped && !isOverflow) {
          const prevDataList = getCurrentObjectsList();
          setDataList([...prevDataList, target]);
        }
      }
    });

    canvasInstance.current?.on("mouse:up", (e: IEvent<MouseEvent>) => {
      console.log("[mouse:up] e:", e);
      const target = {
        x: Math.ceil(e.target?.aCoords?.tl.x ?? -1),
        y: Math.ceil(e.target?.aCoords?.tl.y ?? -1),
        width: Math.ceil(
          (e.target?.aCoords?.tr.x ?? 0) - (e.target?.aCoords?.tl.x ?? 0) - 1,
        ),
        height: Math.ceil(
          (e.target?.aCoords?.bl.y ?? 0) - (e.target?.aCoords?.tl.y ?? 0) - 1,
        ),
      };

      const isOverflow = detectIsOverflow(target);

      if (e.target) {
        const isOverlapped = detectIsOverlapped(target);
        if (
          isOverflow ||
          isOverlapped ||
          e.transform?.corner === "deleteControl"
        ) {
          setDataList((prev) => [...prev]);
        } else {
          const prevDataList = getCurrentObjectsList();
          if (target.x !== -1 && target.y !== -1) {
            setDataList([...prevDataList.slice(0, -1), target]);
          }
        }
      }
    });

    dataList.forEach((data) => {
      const rect = new fabric.Rect({
        top: data.y,
        left: data.x,
        width: data.width,
        height: data.height,
        fill: "transparent",
        stroke: "blue",
      });

      canvasInstance.current?.add(rect);
      canvasInstance.current?.setActiveObject(rect);
    });

    return () => {
      canvasInstance.current?.dispose();
    };
  }, [viewerSize, dataList, setDataList]);

  return (
    <ImageSelectorContainer>
      <canvas ref={canvasRef} width={0} height={0} />
    </ImageSelectorContainer>
  );
}
