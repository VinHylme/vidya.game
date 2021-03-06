import { useEffect, useRef, useState } from "react";
import { isMobile, isTablet } from "react-device-detect";
import { Document, Page, pdfjs } from "react-pdf";
import { useDrag } from '@use-gesture/react';
import { classNames } from "@/common/helpers";
import { useDetectIsMobileView } from "@/hooks/useDetectIsMobileView";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export interface IPDFViewerProps {
  url: string;
  initialPageNumber?: number;
  width?: number;
  height?: number;
}

export default function PDFViewer({url, initialPageNumber=1, width, height}: IPDFViewerProps) {
  const [numPages, setNumPages] = useState(null);
  const docRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const { isMobileView } = useDetectIsMobileView();
  const [pageNumber, setPageNumber] = useState(initialPageNumber);
  
  const bind:any = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
    const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
    if (!active && trigger) {
      if(xDir === 1)  { //left
        if(pageNumber > 1) {
          setPageNumber(pageNumber - 1);
        }
      }
      if(xDir === -1) { //right
        if(pageNumber < numPages) {
          setPageNumber(pageNumber + 1);
        }
      }
    } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
  });

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const onMouseMove = (e)=> {
    if(!docRef?.current || !rightRef?.current || !leftRef?.current) return;
    const {left, right} = docRef.current.getBoundingClientRect();
    const {clientX} = e;
    const xl = clientX - left;
    const xr = right - clientX;
    
    if(xl <= 100) {
      leftRef.current.style.display = 'block';
    }
    else if(xr <= 100) {
      rightRef.current.style.display = 'block';
    }
    else{
      leftRef.current.style.display = 'none';
      rightRef.current.style.display = 'none';
    }

  }

  const onMouseLeave = () => {
    leftRef.current.style.display = 'none';
    rightRef.current.style.display = 'none';
  }

  const isDeviceMobile = isMobile || isMobileView || isTablet;

  return (
    <div className="w-full flex flex-col justify-center items-center prose gap-y-vmd">
      <div ref={docRef} onMouseLeave={onMouseLeave} onMouseMove={onMouseMove} className="relative" style={{maxHeight: (height*scale)+100}} {...bind()}>
        <div className="w-full h-full">
          <div ref={leftRef} className={classNames('h-full w-32 z-50 absolute left-0 hover:cursor-pointer hidden', isDeviceMobile ? '' : 'bg-accent-dark-800/30')} onClick={() => setPageNumber(pageNumber - 1)}>
            <div className="h-full w-full flex flex-col justify-center items-center text-white">
              <button className="text-light-100 font-bold">
                Previous
              </button>
            </div>
          </div>
          <div ref={rightRef} className={classNames('h-full w-32 z-50 absolute right-0 hover:cursor-pointer hidden', isDeviceMobile ? '' : 'bg-accent-dark-800/30')} onClick={() => setPageNumber(pageNumber + 1)}>
            <div className="h-full w-full flex flex-col justify-center items-center text-white">
              <button className="text-light-100 font-bold">
                Next
              </button>
            </div>
          </div>
          </div>
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess} className="w-full flex justify-center" renderMode="canvas">
          <Page className={scale === 1.5 ? 'hover:cursor-zoom-out' : 'hover:cursor-zoom-in'} onClick={() => {
            !isDeviceMobile && setScale(scale === 1.5 ? 1 : 1.5);
          }} pageNumber={pageNumber} width={width} height={height} scale={scale}/>
        </Document>
      </div>
      <div className="flex flex-col justify-center items-center z-50 gap-y-vmd">
        <p>Page: {pageNumber} of {numPages}</p>
      </div>
    </div>
  );
}
