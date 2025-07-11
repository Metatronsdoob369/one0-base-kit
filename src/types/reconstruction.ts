export type ReconstructionBundle = {
  structure_skeleton: string[];
  tone_profile: string;
  metaphor_engine: string[];
  prompt_fragments: Record<string, string>;
  module_refs: string[];
};

export type ReconstructedCore = {
  coreId: string;
  reconstruction_bundle: ReconstructionBundle;
  source_type: 'book' | 'article' | 'snapshot';
  status: 'complete' | 'pending';
}; 