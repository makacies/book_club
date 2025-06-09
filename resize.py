from PIL import Image
import os
import argparse

def resize_image(input_folder, output_folder, target_width):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for index, filename in enumerate(os.listdir(input_folder)):
        input_path = os.path.join(input_folder, filename)
        output_filename = str(index) + ".png"
        output_path = os.path.join(output_folder, output_filename)

        with Image.open(input_path) as image:
            aspect_ratio = image.height / image.width
            target_height = int(target_width * aspect_ratio)

            resized_image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
            resized_image.save(output_path)
            print(f"Resized and saved: {output_path}")


input_folder = './covers_original'
output_folder = './covers'

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Resize PNG images in a folder.")
    parser.add_argument("target_width", type=int, help="Target width for resizing images.")
    args = parser.parse_args()

    resize_image(input_folder, output_folder, args.target_width)