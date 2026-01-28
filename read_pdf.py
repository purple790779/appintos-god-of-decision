from pypdf import PdfReader
import sys

# Using raw string for windows path
pdf_path = r"C:\Users\JAY\Pictures\Screenshots\AppsInToss_Logo_Guide_600_600.pdf"

try:
    reader = PdfReader(pdf_path)
    text = ""
    print(f"Total Pages: {len(reader.pages)}")
    for i, page in enumerate(reader.pages):
        print(f"--- Page {i+1} ---")
        extracted = page.extract_text()
        print(extracted)
        text += extracted + "\n"
    print("--- PDF Content End ---")
except Exception as e:
    print(f"Error reading PDF: {e}")
