# Usage Examples

## React Component Example

```jsx
// App.js
import React from 'react';
import EmpowerlocalAd from './EmpowerlocalAd';

function App() {
  return (
    <div className="App">
      <header>
        <h1>My React App</h1>
      </header>
      
      <main>
        <article>
          <h2>Blog Post Title</h2>
          
          {/* Video ad at top of article */}
          <EmpowerlocalAd 
            zoneId="12345" 
            keyword="technology" 
          />
          
          <p>Your article content goes here...</p>
          
          {/* Video ad in middle of article */}
          <EmpowerlocalAd 
            zoneId="67890" 
            keyword="article" 
          />
          
          <p>More article content...</p>
        </article>
      </main>
      
      <aside>
        <h3>Related Content</h3>
        
        {/* Sidebar video ad */}
        <EmpowerlocalAd 
          zoneId="sidebar-123" 
          keyword="related" 
        />
      </aside>
    </div>
  );
}

export default App;
```

## Astro Component Example

```astro
---
// pages/blog/[slug].astro
import Layout from '../../layouts/Layout.astro';
import EmpowerlocalVideo from '../../components/EmpowerlocalAd.astro';

const { slug } = Astro.params;
---

<Layout title="Blog Post">
  <article>
    <h1>My Blog Post</h1>
    
    <!-- Video ad at top -->
    <EmpowerlocalAd 
      zoneId="12345"
      keyword="blog"
      className="top-ad"
    />
    
    <div class="content">
      <p>Your blog post content here...</p>
      
      <!-- Video ad in middle -->
      <EmpowerlocalAd 
        zoneId="67890"
        keyword="article"
        className="middle-ad"
      />
      
      <p>More content...</p>
    </div>
  </article>
  
  <aside>
    <h2>Related Posts</h2>
    
    <!-- Sidebar ad -->
    <EmpowerlocalAd 
      zoneId="sidebar-123"
      keyword="sidebar"
      className="sidebar-ad"
    />
  </aside>
</Layout>

<style>
  .top-ad, .middle-ad {
    margin: 2rem 0;
    text-align: center;
  }
  
  .sidebar-ad {
    margin: 1rem 0;
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
  }
  
  .content {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
  }
</style>
```

## Advanced Usage

### React with Error Boundary

```jsx
import React from 'react';
import EmpowerlocalAd from './EmpowerlocalAd';

class AdErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Ad loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="ad-fallback">Advertisement</div>;
    }

    return this.props.children;
  }
}

function BlogWithAds() {
  return (
    <article>
      <h1>Article Title</h1>
      
      <AdErrorBoundary>
        <EmpowerlocalAd zoneId="123" keyword="news" />
      </AdErrorBoundary>
      
      <p>Article content...</p>
    </article>
  );
}
```

### Astro with Dynamic Zone IDs

```astro
---
// pages/category/[category].astro
import EmpowerlocalVideo from '../../components/EmpowerlocalAd.astro';

const { category } = Astro.params;

// Map categories to zone IDs
const zoneMap = {
  'technology': 'tech-zone-123',
  'sports': 'sports-zone-456',
  'news': 'news-zone-789'
};

const zoneId = zoneMap[category] || 'default-zone-000';
---

<main>
  <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Articles</h1>
  
  <!-- Dynamic ad based on category -->
  <EmpowerlocalAd 
    zoneId={zoneId}
    keyword={category}
    className={`${category}-ad`}
  />
  
  <div class="articles">
    <!-- Article list here -->
  </div>
</main>
```

## Testing

### React Testing with Jest

```jsx
// EmpowerlocalVideo.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import EmpowerlocalAd from './EmpowerlocalAd';

// Mock fetch
global.fetch = jest.fn();

describe('EmpowerlocalVideo', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders without crashing', () => {
    render(<EmpowerlocalAd zoneId="test-zone" />);
    expect(document.querySelector('div')).toBeInTheDocument();
  });

  test('calls API with correct parameters', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'SUCCESS',
        placements: {
          placement_1: {
            eligible_url: 'http://test.com/eligible',
            viewable_url: 'http://test.com/viewable',
            body: '<div>Test Ad</div>'
          }
        }
      })
    });

    render(<EmpowerlocalAd zoneId="test-zone" keyword="test" />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('setID=test-zone'),
        {}
      );
    });
  });
});
```

### Astro Testing with Playwright

```javascript
// tests/empowerlocal.spec.js
import { test, expect } from '@playwright/test';

test('EmpowerLocal video component loads', async ({ page }) => {
  await page.goto('/test-page');
  
  // Check if the component container exists
  const adContainer = page.locator('[id^="empower-video-"]');
  await expect(adContainer).toBeVisible();
  
  // Check if the component has the correct data attributes
  await expect(adContainer).toHaveAttribute('data-zone-id', 'test-zone');
  await expect(adContainer).toHaveAttribute('data-keyword', 'test');
});
```
