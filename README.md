# 📤 Upload Service

Service xử lý upload file (ảnh, documents) cho hệ thống Dorm Booking System. Service này tích hợp với Cloudinary để lưu trữ và quản lý files.

## 🚀 Tính năng

### **File Upload**
- ✅ Upload ảnh lên Cloudinary
- ✅ Upload multiple files
- ✅ File validation (type, size)
- ✅ Image optimization
- ✅ Generate secure URLs
- ✅ Delete files

### **Integration**
- ✅ Cloudinary integration
- ✅ Multer for file handling
- ✅ Stream handling

### **Features**
- ✅ Support multiple file formats
- ✅ File size limits
- ✅ Automatic image optimization
- ✅ Secure file URLs

## 📁 Cấu trúc thư mục

```
src/
├── uploads/             # Upload module
│   ├── dto/            # Data Transfer Objects
│   ├── uploads.controller.ts
│   ├── uploads.service.ts
│   └── uploads.module.ts
└── main.ts
```

## ⚙️ Cấu hình

### **Environment Variables**

Tạo file `.env` trong thư mục root:

```env
# Application
PORT=3007
NODE_ENV=development

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Upload Settings
MAX_FILE_SIZE=10485760  # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/gif,image/webp
UPLOAD_FOLDER=uploads
```

## 🚀 Cài đặt và chạy

### **Yêu cầu**
- Node.js 18+
- Cloudinary account

### **Cài đặt**

```bash
# Cài đặt dependencies
npm install

# Tạo file .env
cp .env.example .env

# Chỉnh sửa .env với thông tin Cloudinary của bạn
```

### **Chạy development**

```bash
npm run start:dev
# hoặc
npm run dev
```

### **Build và chạy production**

```bash
# Build
npm run build

# Chạy production
npm run start:prod
```

## 📡 API Endpoints

### **File Upload**

#### `POST /uploads`
Upload file lên Cloudinary

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `file`: File (required)
  - `folder`: string (optional) - Cloudinary folder
  - `publicId`: string (optional) - Custom public ID

**Example (curl):**
```bash
curl -X POST http://localhost:3007/uploads \
  -F "file=@/path/to/image.jpg" \
  -F "folder=buildings" \
  -F "publicId=building-123"
```

**Response:**
```json
{
  "publicId": "buildings/building-123",
  "url": "https://res.cloudinary.com/cloud-name/image/upload/v1234567890/buildings/building-123.jpg",
  "secureUrl": "https://res.cloudinary.com/cloud-name/image/upload/v1234567890/buildings/building-123.jpg",
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "bytes": 245678,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### `POST /uploads/multiple`
Upload multiple files

**Request:**
- Content-Type: `multipart/form-data`
- Body:
  - `files`: File[] (required) - Multiple files
  - `folder`: string (optional)

**Response:**
```json
{
  "files": [
    {
      "publicId": "buildings/file-1",
      "url": "https://res.cloudinary.com/...",
      "secureUrl": "https://res.cloudinary.com/...",
      "format": "jpg",
      "bytes": 245678
    },
    {
      "publicId": "buildings/file-2",
      "url": "https://res.cloudinary.com/...",
      "secureUrl": "https://res.cloudinary.com/...",
      "format": "png",
      "bytes": 345678
    }
  ],
  "totalFiles": 2,
  "totalBytes": 591356
}
```

#### `DELETE /uploads/:publicId`
Xóa file từ Cloudinary

**Request:**
```
DELETE /uploads/buildings/building-123
```

**Response:**
```json
{
  "message": "File deleted successfully",
  "publicId": "buildings/building-123"
}
```

#### `GET /uploads/:publicId`
Lấy thông tin file

**Response:**
```json
{
  "publicId": "buildings/building-123",
  "url": "https://res.cloudinary.com/...",
  "secureUrl": "https://res.cloudinary.com/...",
  "format": "jpg",
  "width": 1920,
  "height": 1080,
  "bytes": 245678,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

## 🔧 Cloudinary Configuration

### **Setup Cloudinary Account**

1. Đăng ký tài khoản tại [Cloudinary](https://cloudinary.com)
2. Lấy thông tin từ Dashboard:
   - Cloud Name
   - API Key
   - API Secret

### **Upload Options**

Service hỗ trợ các options sau:
- `folder`: Tổ chức files vào folders
- `publicId`: Custom public ID cho file
- `transformation`: Image transformations (resize, crop, etc.)

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🐳 Docker

```bash
# Build image
docker build -t upload-service .

# Run với docker-compose
docker-compose up
```

## 🔒 Security

- File type validation
- File size limits
- Secure file URLs
- Input validation
- CORS configuration

## 📝 Notes

- Service sử dụng Cloudinary để lưu trữ files
- Files được optimize tự động
- Support multiple image formats
- Secure URLs được generate tự động
- Files có thể được organize vào folders

## 📚 Tài liệu thêm

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Multer Documentation](https://github.com/expressjs/multer)

## 📄 License

MIT
