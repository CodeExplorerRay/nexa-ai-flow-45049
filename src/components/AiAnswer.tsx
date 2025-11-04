import React from 'react';
import { Source } from '@/lib/rag';
import { FileText } from 'lucide-react';

interface AiAnswerProps {
  text: string;
  sources: Source[];
}

const AiAnswer: React.FC<AiAnswerProps> = ({ text, sources }) => {
  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none rounded-md border bg-muted p-4">
        <p>{text}</p>
      </div>
      
      {sources && sources.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold mb-2">Sources:</h4>
          <div className="space-y-2">
            {sources.map((source, index) => (
              <div key={source.id || index} className="border rounded-md p-3 bg-background/50">
                <div className="flex items-start space-x-2">
                  <FileText className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                  <p className="text-xs text-muted-foreground italic">
                    {source.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AiAnswer;