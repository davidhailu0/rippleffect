"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { ChevronDown, Share2, BookOpen } from "lucide-react";
import { TopicList } from "./TopicsList";

interface TrainingCardProps {
  title: string;
  description: string;
  shareLink: string;
  topics: {
    id: number;
    title: string;
    lessons: { id: number; title: string }[];
  }[];
}

export function TrainingCard({
  title,
  description,
  shareLink,
  topics,
}: TrainingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + shareLink);
    toast.success("Link copied to clipboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md max-w-xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 mt-2">{description}</p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 mt-4 text-pink-500"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-180" : ""
                }`}
            />
            {isExpanded ? "Hide Lessons" : "Show Lessons"}
          </button>
        </div>
        {isExpanded && (
          <div className="p-6 bg-gray-50">
            <TopicList topics={topics} />
          </div>
        )}
        <div className="p-6 flex flex-col sm:flex-row items-center gap-4 border-t">
          <QRCodeSVG value={shareLink} size={100} className="rounded-md" />
          <div className="flex-1">
            <button onClick={handleShareClick} className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-2 px-4 rounded-lg">
              <Share2 className="inline-block mr-2" />
              Share Training
            </button>
            <Link href={shareLink} target="_blank" className="mt-2 block">
              <button className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg">
                <BookOpen className="inline-block mr-2" />
                Start Learning
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
