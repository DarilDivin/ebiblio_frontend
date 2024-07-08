"use client";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import {
  RenderSwitchSelectionModeProps,
  SelectionMode,
  selectionModePlugin,
} from "@react-pdf-viewer/selection-mode";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
// ----------------------- A remettre si le fichier redeviens .tsx ------------------------------

import type {
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";

// Import styles
import "@react-pdf-viewer/selection-mode/lib/styles/index.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Button } from "./ui/button";
import axios from "@/lib/axios";

const ViewPdf = ({ fileUrl }: { fileUrl: string }) => {
// const ViewPdf = ({ fileUrl }) => {

  // const pdfUrl = `http://localhost:8000/pdf/${fileUrl}` 
  const pdfUrl = `http://localhost:8000/api/pdf/1720449135-Lary_Murie.pdf` 

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
  // const transform = (slot) => ({
    ...slot,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Open: () => <></>,
    OpenMenuItem: () => <></>,
    Print: () => <></>,
    PrintMenuItem: () => <></>,
    // EnterFullScreen: () => <></>,
    // EnterFullScreenMenuItem: () => <></>,
    // SwitchTheme: () => <></>,
    // SwitchThemeMenuItem: () => <></>,
  });

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [],
    renderToolbar: (Toolbar) => (
      <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
    ),
  });
  // Import styles
  const selectionModePluginInstance = selectionModePlugin({
    selectionMode: "Hand",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-end">Consulter</Button>
      </DialogTrigger>
      <DialogContent className="w-full h-[90vh] max-w-screen-xl overflow-scroll">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className=" h-[750px]">
            <Viewer
              // fileUrl={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${fileUrl}`}
              // fileUrl="http://localhost:8000/storage/Supported%20Memories/memories/1718091986-djodjokoutondaril_ticket_qr.pdf"
              // fileUrl="/pdfs/pdf.pdf"
              fileUrl={pdfUrl}
              plugins={[
                defaultLayoutPluginInstance,
                selectionModePluginInstance,
              ]}
            />
          </div>
        </Worker>
      </DialogContent>
    </Dialog>
  );
};
export default ViewPdf;
