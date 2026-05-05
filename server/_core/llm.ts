// Stubbed LLM service - not configured for Railway deployment
// Keep type exports for compatibility

export type Role = "system" | "user" | "assistant" | "tool" | "function";

export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image_url";
  image_url: {
    url: string;
    detail?: "auto" | "low" | "high";
  };
};

export type FileContent = {
  type: "file_url";
  file_url: {
    url: string;
    mime_type?: "audio/mpeg" | "audio/wav" | "application/pdf" | "audio/mp4" | "video/mp4";
  };
};

export type MessageContent = string | TextContent | ImageContent | FileContent;

export type Message = {
  role: Role;
  content: MessageContent | MessageContent[];
  name?: string;
  tool_call_id?: string;
};

export type Tool = {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, unknown>;
  };
};

export type ToolChoicePrimitive = "none" | "auto" | "required";
export type ToolChoiceByName = { name: string };
export type ToolChoiceExplicit = {
  type: "function";
  function: {
    name: string;
  };
};

export type ToolChoice =
  | ToolChoicePrimitive
  | ToolChoiceByName
  | ToolChoiceExplicit;

export type InvokeParams = {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  tools?: Tool[];
  tool_choice?: ToolChoice;
  responseFormat?: string | object;
  response_format?: string | object;
  outputSchema?: object;
  output_schema?: object;
};

export type ToolCall = {
  id: string;
  type: "function";
  function: {
    name: string;
    arguments: string;
  };
};

export type InvokeResult = {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: "assistant";
      content: string | null;
      tool_calls?: ToolCall[];
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export type JsonSchema = {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
  [key: string]: unknown;
};

export type OutputSchema = JsonSchema;

export type ResponseFormat =
  | "text"
  | "json_object"
  | "json_schema"
  | { type: "text" }
  | { type: "json_object" }
  | { type: "json_schema"; json_schema: { name: string; schema: JsonSchema; strict?: boolean } };

/**
 * LLM invocation function - STUBBED
 * Throws error indicating LLM service is not configured
 */
export async function invokeLLM(params: InvokeParams): Promise<InvokeResult> {
  throw new Error(
    "LLM service is not configured. This feature requires an LLM API integration (OpenAI, Anthropic, etc.) which has not been set up for this Railway deployment."
  );
}
