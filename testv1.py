from openvoice.api import BaseSpeakerTTS, ToneColorConverter
import torchaudio

ckpt_base = "checkpoints/base_speakers/EN"
ckpt_converter = "checkpoints/converter"

base_speaker_tts = BaseSpeakerTTS(ckpt_base)
converter = ToneColorConverter(ckpt_converter)

# 1. Load reference voice
ref_audio, sr = torchaudio.load("reference.wav")

# 2. Generate base speech
base_audio_path = "output_base.wav"
base_speaker_tts.infer(
    text="Hello, this is a test.",
    output_path=base_audio_path
)

# 3. Convert to target voice
output_path = "output_final.wav"
converter.convert(
    audio_src_path=base_audio_path,
    audio_tgt=ref_audio,
    output_path=output_path
)
