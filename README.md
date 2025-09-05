# EmpowerLocal Ad Components

A collection of components for integrating EmpowerLocal ads into React and Astro applications.

## 📁 Files Included

- `README.md` - Complete documentation and usage guide
- `EmpowerlocalAd.js` - React component
- `EmpowerlocalAd.astro` - Astro component for Vercel/Astro platform
- `types.d.ts` - TypeScript definitions
- `package.json` - Dependencies and project configuration
- `example-usage.astro` - Basic usage examples
- `usage-examples.md` - Advanced usage examples and testing

## 🚀 Quick Start

### React Component

```jsx
import EmpowerlocalAd from './EmpowerlocalAd';

function App() {
  return (
    <div>
      {/* Basic usage - keyword is optional, defaults to "article" */}
      <EmpowerlocalAd zoneId="your-zone-id-here" />
      
      {/* With custom keyword */}
      <EmpowerlocalAd zoneId="your-zone-id-here" keyword="technology" />
    </div>
  );
}
```

### Astro Component

```astro
---
import EmpowerlocalAd from './EmpowerlocalAd.astro';
---

<!-- Basic usage - keyword is optional -->
<EmpowerlocalAd zoneId="your-zone-id-here" />

<!-- With custom keyword -->
<EmpowerlocalAd zoneId="your-zone-id-here" keyword="sports" />
```

## 📋 Component Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `zoneId` | `string` | ✅ Yes | - | EmpowerLocal zone ID for ad placement |
| `keyword` | `string` | ❌ No | `"article"` | Keyword for ad targeting |
| `className` | `string` | ❌ No | `""` | Additional CSS class (Astro only) |

### 💡 **About the `keyword` Prop**

The `keyword` prop is **completely optional**:
- **Default behavior**: If omitted, defaults to `"article"`
- **Custom targeting**: Specify a keyword to target specific ad content
- **Common values**: `"technology"`, `"sports"`, `"news"`, `"sidebar"`, etc.
- **Flexible**: Can be changed dynamically in React (component will re-render)

## 🔧 Features

### React Component
- ✅ React hooks (useState, useEffect, useRef)
- ✅ Automatic ad fetching and rendering
- ✅ Error handling and logging
- ✅ DOM manipulation for ad insertion

### Astro Component
- ✅ Server-side rendering compatible
- ✅ Client-side hydration
- ✅ Vercel deployment optimized
- ✅ Multiple instance support
- ✅ Astro navigation system integration
- ✅ TypeScript support

## 🌐 Platform Compatibility

| Platform | React Component | Astro Component |
|----------|----------------|-----------------|
| Create React App | ✅ | ❌ |
| Next.js | ✅ | ❌ |
| Astro | ❌ | ✅ |
| Vercel | ✅ | ✅ |
| Netlify | ✅ | ✅ |

## 📦 Installation

### For React Projects

```bash
npm install react react-dom
```

### For Astro Projects

```bash
npm create astro@latest
# or
npm install astro
```

## 🔨 Usage Examples

### React - Multiple Ads

```jsx
function BlogPost() {
  return (
    <article>
      <h1>Blog Title</h1>
      
      {/* Top of article */}
      <EmpowerlocalAd zoneId="top-zone-id" keyword="blog" />
      
      <p>Article content...</p>
      
      {/* Middle of article */}
      <EmpowerlocalAd zoneId="middle-zone-id" keyword="article" />
      
      <p>More content...</p>
      
      {/* Bottom of article */}
      <EmpowerlocalAd zoneId="bottom-zone-id" keyword="related" />
    </article>
  );
}
```

### Astro - Page Layout

```astro
---
import EmpowerlocalAd from './EmpowerlocalAd.astro';
---

<!DOCTYPE html>
<html>
<head>
  <title>My Astro Site</title>
</head>
<body>
  <header>
    <h1>Welcome to My Site</h1>
  </header>
  
  <main>
    <article>
      <h2>Article Title</h2>
      <EmpowerlocalAd zoneId="article-zone" keyword="news" />
      <p>Article content here...</p>
    </article>
  </main>
  
  <aside>
    <h3>Sidebar</h3>
    <EmpowerlocalAd 
      zoneId="sidebar-zone" 
      keyword="sidebar" 
      className="sidebar-ad"
    />
  </aside>
</body>
</html>
```

## 🎨 Styling

### CSS for Ad Containers

```css
/* Hide tracking pixels */
.empower-ad img[width="1"][height="1"] {
  position: absolute;
  left: -9999px;
  top: -9999px;
  visibility: hidden;
}

/* Style the ad container */
.sidebar-ad {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 8px;
}

/* Responsive ad container */
.empower-ad-responsive {
  width: 100%;
  max-width: 728px;
  margin: 20px auto;
}

@media (max-width: 768px) {
  .empower-ad-responsive {
    max-width: 320px;
  }
}
```

## 🔍 API Details

The components fetch ads from:
```
https://ads.empowerlocal.co/adserve/;ID=181918;size=0x0;setID=${zoneId};referrer=${referrerUrl};kw=${keyword};type=json;click=CLICK_MACRO_PLACEHOLDER
```

### Response Format

```json
{
  "status": "SUCCESS",
  "placements": {
    "placement_1": {
      "eligible_url": "https://...",
      "viewable_url": "https://...",
      "body": "<video>...</video>"
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**Ads not loading:**
- Verify `zoneId` is correct
- Check network connectivity
- Review browser console for errors
- Ensure referrer URL is allowed

**React component not updating:**
- Check that `zoneId` prop is changing
- Verify useEffect dependencies

**Astro component not initializing:**
- Ensure JavaScript is enabled
- Check for conflicting CSS
- Verify Astro page load events

### Debug Mode

Add this to enable debug logging:

```javascript
// In browser console
localStorage.setItem('empowerlocal-debug', 'true');
```

## 🚀 Deployment

### Vercel (Recommended for Astro)

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Upload dist folder to Netlify
```

### Traditional Hosting

```bash
npm run build
# Upload build files to your server
```

## 📄 License

MIT License - Feel free to use in your projects!

## 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📞 Support

For EmpowerLocal API support, contact their support team.
For component issues, please open an issue on this repository.

---

*Last updated: December 2024*
