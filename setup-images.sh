#!/bin/bash

# Portfolio Image Setup Script
echo "🎨 Setting up your portfolio images..."

# Create images directory if it doesn't exist
mkdir -p images

# Source directory with your images
SOURCE_DIR="/Users/simum/Downloads/Personal Portfolio Project/image"

echo "📁 Found images in: $SOURCE_DIR"

# Function to convert HEIC to JPG
convert_heic_to_jpg() {
    local input_file="$1"
    local output_file="$2"
    
    if command -v sips &> /dev/null; then
        sips -s format jpeg "$input_file" --out "$output_file" &> /dev/null
        echo "✅ Converted: $(basename "$input_file") → $(basename "$output_file")"
        return 0
    else
        echo "⚠️  Cannot convert HEIC files. Copying as-is."
        cp "$input_file" "$output_file"
        return 1
    fi
}

# Copy and convert profile image (first suitable image found)
echo "🖼️  Setting up profile image..."
profile_set=false

# Use a simple approach to find the first image
for file in "$SOURCE_DIR"/*; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        extension="${filename##*.}"
        
        # Check if it's an image file
        case "${extension,,}" in
            jpg|jpeg|png)
                cp "$file" "images/profile.jpg"
                echo "✅ Profile image set: $filename"
                profile_set=true
                break
                ;;
            heic)
                convert_heic_to_jpg "$file" "images/profile.jpg"
                profile_set=true
                break
                ;;
        esac
    fi
done

# Copy project images
echo "📸 Setting up project images..."
counter=1

for file in "$SOURCE_DIR"/*; do
    if [ -f "$file" ] && [ $counter -le 6 ]; then
        filename=$(basename "$file")
        extension="${filename##*.}"
        
        # Check if it's an image file
        case "${extension,,}" in
            jpg|jpeg|png)
                cp "$file" "images/project${counter}.jpg"
                echo "✅ Project image $counter set: $filename"
                ((counter++))
                ;;
            heic)
                convert_heic_to_jpg "$file" "images/project${counter}.jpg"
                ((counter++))
                ;;
        esac
    fi
done

# Create a README for the images directory
cat > images/README.md << 'EOF'
# Portfolio Images

This directory contains images for your portfolio website:

- `profile.jpg` - Your main profile photo (used in hero section)
- `project1.jpg` to `project6.jpg` - Project showcase images

## Adding Your Own Images

1. Replace any of these files with your own images
2. Keep the same filenames for automatic integration
3. Recommended sizes:
   - Profile: 300x300px (square, will be cropped to circle)
   - Projects: 300x200px (landscape orientation)

## Supported Formats
- JPG/JPEG
- PNG
- HEIC (will be converted to JPG)

## Tips
- Use high-quality images for best results
- Ensure images are web-optimized (under 1MB each)
- Consider the story each project image tells about your work
EOF

echo ""
echo "🎉 Image setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Review the images in the 'images' directory"
echo "2. Replace any images with your preferred photos"
echo "3. Open index.html in your browser to see your portfolio"
echo ""
echo "💡 Tip: You can run this script again anytime to refresh your images"
