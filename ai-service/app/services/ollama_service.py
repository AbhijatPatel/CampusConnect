import os
import requests
import json
from typing import Optional, Dict, Any

OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:latest")

def is_ollama_available() -> bool:
    try:
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=1.5)
        return response.status_code == 200
    except Exception:
        return False

def generate_with_qwen(prompt: str, system_prompt: Optional[str] = None) -> Optional[str]:
    """
    Calls local Ollama instance running Qwen3 / Qwen2.5 model.
    Falls back gracefully if Ollama is not installed/running locally.
    """
    if not is_ollama_available():
        return None

    try:
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.3
            }
        }
        if system_prompt:
            payload["system"] = system_prompt

        resp = requests.post(f"{OLLAMA_BASE_URL}/api/generate", json=payload, timeout=10.0)
        if resp.status_code == 200:
            data = resp.json()
            return data.get("response", "").strip()
    except Exception:
        pass

    return None
