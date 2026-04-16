import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SupervisedViz, UnsupervisedViz, DiscoveryViz } from '../components/ML3DVisualizations';

/**
 * Design Philosophy: Modern Academic - Dark Mode Edition
 * - Professional elegance with intellectual clarity on dark background
 * - Strong typographic hierarchy using Playfair Display for titles
 * - Cyan accent color (#00d4d4) for visual interest on dark
 * - Enhanced code examples and comprehensive analysis
 */

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background?: string;
  layout?: 'title' | 'content' | 'comparison' | 'visual';
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Machine Learning Paradigms',
    subtitle: 'Supervised, Unsupervised, and Discovery-Based Learning',
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center max-w-2xl">
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Explore the three fundamental approaches to machine learning and understand how each paradigm enables computers to learn from data in different ways.
          </p>
          <div className="flex justify-center gap-4 mt-12">
            <div className="w-20 h-20 rounded-lg bg-cyan-900/40 flex items-center justify-center border border-cyan-500/30">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="w-20 h-20 rounded-lg bg-blue-900/40 flex items-center justify-center border border-blue-500/30">
              <span className="text-2xl">🔍</span>
            </div>
            <div className="w-20 h-20 rounded-lg bg-amber-900/40 flex items-center justify-center border border-amber-500/30">
              <span className="text-2xl">💡</span>
            </div>
          </div>
        </div>
      </div>
    ),
    layout: 'title',
  },
  {
    id: 2,
    title: 'What is Machine Learning?',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border-l-4 border-cyan-500">
          <p className="text-lg text-gray-200 leading-relaxed">
            Machine learning is a subset of artificial intelligence that focuses on <span className="font-semibold text-cyan-400">learning patterns from data</span> and providing results based on trained data.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-cyan-400 mb-2">Core Goal</h4>
            <p className="text-gray-300">Enable computers to learn and improve from experience without explicit programming</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-cyan-400 mb-2">Key Capability</h4>
            <p className="text-gray-300">Pattern recognition that enables accurate predictions and decisions</p>
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 3,
    title: 'The Three Paradigms',
    content: (
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-6 rounded-lg border border-blue-500/30 hover:border-blue-400/60 transition-colors">
          <div className="text-4xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-blue-300 mb-3">Supervised Learning</h3>
          <p className="text-gray-400 text-sm">Learning from labeled data with known inputs and outputs</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/20 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-colors">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-cyan-300 mb-3">Unsupervised Learning</h3>
          <p className="text-gray-400 text-sm">Discovering patterns in unlabeled data without guidance</p>
        </div>
        <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 p-6 rounded-lg border border-amber-500/30 hover:border-amber-400/60 transition-colors">
          <div className="text-4xl mb-4">💡</div>
          <h3 className="text-xl font-bold text-amber-300 mb-3">Discovery-Based</h3>
          <p className="text-gray-400 text-sm">Self-directed learning through exploration and inquiry</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 4,
    title: 'Supervised Learning',
    subtitle: 'Learning with a Teacher',
    content: (
      <div className="space-y-6">
        <SupervisedViz />
        <div className="bg-blue-900/30 p-6 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-300 mb-3">Core Concept</h4>
          <p className="text-gray-300">The model learns a mapping from inputs (X) to outputs (Y) using labeled pairs. It's like learning with a teacher who provides correct answers during training.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-blue-400 mb-2">✓ Advantages</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• High accuracy on well-defined tasks</li>
              <li>• Predictable and interpretable</li>
              <li>• Proven in production systems</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-red-400 mb-2">✗ Challenges</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Requires expensive labeled data</li>
              <li>• Prone to overfitting</li>
              <li>• Time-consuming annotation</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    layout: 'visual',
  },
  {
    id: 5,
    title: 'Supervised Learning: Code Example',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`# Linear Regression Example (Python)
from sklearn.linear_model import LinearRegression
import numpy as np

# Training data: House features and prices
X = np.array([[1000], [1500], [2000], [2500]])  # Square feet
y = np.array([200000, 300000, 400000, 500000])  # Prices

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
new_house = np.array([[1800]])
predicted_price = model.predict(new_house)
print(f"Predicted price: ${'{'}predicted_price[0]{':'},.0f{'}'}")`}
          </pre>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Real-World Use Case: Real Estate</h4>
          <p className="text-gray-300 text-sm">Predicting house prices based on square footage, location, bedrooms, and other features. The model learns from historical sales data to estimate market values.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 6,
    title: 'Supervised Learning: Real-World Case Study',
    subtitle: 'Real Estate Price Prediction',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 col-span-3">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🏠</div>
              <div>
                <h4 className="font-bold text-blue-300 mb-1">The Problem</h4>
                <p className="text-gray-300 text-sm">A real estate platform wants to automatically estimate property values. Buyers and sellers need fair, data-driven prices — but human appraisals are slow and expensive. A supervised model trained on historical sales can predict prices in milliseconds.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-3">📥 Input Features (X)</h4>
            <ul className="text-sm text-gray-300 space-y-1.5">
              <li className="flex justify-between"><span>Square footage</span><span className="text-cyan-400">1,850 sqft</span></li>
              <li className="flex justify-between"><span>Bedrooms</span><span className="text-cyan-400">3</span></li>
              <li className="flex justify-between"><span>Bathrooms</span><span className="text-cyan-400">2</span></li>
              <li className="flex justify-between"><span>Neighborhood score</span><span className="text-cyan-400">8.2 / 10</span></li>
              <li className="flex justify-between"><span>Year built</span><span className="text-cyan-400">2005</span></li>
              <li className="flex justify-between"><span>Distance to city center</span><span className="text-cyan-400">4.2 km</span></li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-3">⚙️ Training Process</h4>
            <ol className="text-sm text-gray-300 space-y-1.5 list-none">
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">1.</span><span>Collect 50,000+ past sales with known prices</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">2.</span><span>Engineer features (age, price-per-sqft, etc.)</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">3.</span><span>Train Gradient Boosting model (XGBoost)</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">4.</span><span>Validate on held-out 20% of data</span></li>
              <li className="flex gap-2"><span className="text-cyan-400 font-bold">5.</span><span>Tune hyperparameters to minimize RMSE</span></li>
            </ol>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-3">📤 Output & Results</h4>
            <div className="space-y-2 text-sm">
              <div className="bg-blue-900/40 p-2 rounded flex justify-between items-center">
                <span className="text-gray-300">Predicted price</span>
                <span className="text-blue-300 font-bold">$412,500</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded flex justify-between items-center">
                <span className="text-gray-300">Confidence range</span>
                <span className="text-gray-400">±$18,000</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded flex justify-between items-center">
                <span className="text-gray-300">Model accuracy (R²)</span>
                <span className="text-green-400">0.94</span>
              </div>
              <div className="bg-gray-900/50 p-2 rounded flex justify-between items-center">
                <span className="text-gray-300">Avg. error (MAPE)</span>
                <span className="text-green-400">4.2%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-900/20 to-gray-900/20 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 mb-2">🔑 Key Feature Importances</h4>
            <div className="space-y-2">
              {[
                { label: 'Square footage', pct: 34 },
                { label: 'Neighborhood score', pct: 28 },
                { label: 'Distance to center', pct: 18 },
                { label: 'Year built', pct: 12 },
                { label: 'Bedrooms / Baths', pct: 8 },
              ].map(({ label, pct }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 w-40 shrink-0">{label}</span>
                  <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-cyan-400 w-8 text-right">{pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-900/20 to-gray-900/20 p-4 rounded-lg border border-blue-500/20">
            <h4 className="font-semibold text-blue-400 mb-2">🏢 Real Deployments</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Zillow Zestimate</strong> — estimates for 100M+ US homes using similar regression models</span></li>
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Redfin Estimate</strong> — updates daily with new MLS data, ~2.4% median error</span></li>
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Opendoor</strong> — uses ML pricing to make instant cash offers on homes</span></li>
            </ul>
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 7,
    title: 'Supervised Learning: Types & Algorithms',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-900/30 to-gray-900/30 p-6 rounded-lg border border-blue-500/30">
          <h4 className="text-lg font-bold text-blue-300 mb-3">Classification</h4>
          <p className="text-gray-300 mb-3">Predicting discrete categories or classes</p>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400">
            <strong className="text-cyan-400">Examples:</strong> Spam detection (spam/not spam), Image recognition (cat/dog/person), Sentiment analysis (positive/negative/neutral)
          </div>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400 mt-2">
            <strong className="text-cyan-400">Algorithms:</strong> Logistic Regression, Decision Trees, Random Forest, SVM, Neural Networks
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-900/30 to-gray-900/30 p-6 rounded-lg border border-cyan-500/30">
          <h4 className="text-lg font-bold text-cyan-300 mb-3">Regression</h4>
          <p className="text-gray-300 mb-3">Predicting continuous numerical values</p>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400">
            <strong className="text-cyan-400">Examples:</strong> House price prediction, Temperature forecasting, Stock price estimation, Salary prediction
          </div>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400 mt-2">
            <strong className="text-cyan-400">Algorithms:</strong> Linear Regression, Polynomial Regression, Ridge/Lasso, SVR, Gradient Boosting
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 8,
    title: 'Supervised Learning: Advantages & Limitations',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-3">✓ Advantages</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• High accuracy and reliability</li>
              <li>• Clear performance metrics</li>
              <li>• Well-established algorithms</li>
              <li>• Excellent for production systems</li>
              <li>• Good generalization with proper data</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-bold text-red-400 mb-3">✗ Limitations</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Expensive data annotation required</li>
              <li>• Overfitting on small datasets</li>
              <li>• Poor performance with imbalanced data</li>
              <li>• Limited to learned patterns</li>
              <li>• Requires domain expertise for labeling</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Key Insight</h4>
          <p className="text-gray-300 text-sm">Supervised learning excels when you have quality labeled data and a well-defined problem. The quality of labels directly impacts model performance.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 9,
    title: 'Unsupervised Learning',
    subtitle: 'Discovering Patterns Without Guidance',
    content: (
      <div className="space-y-6">
        <UnsupervisedViz />
        <div className="bg-cyan-900/30 p-6 rounded-lg border-l-4 border-cyan-500">
          <h4 className="font-bold text-cyan-300 mb-3">Core Concept</h4>
          <p className="text-gray-300">The algorithm discovers hidden patterns and structures in unlabeled data. It finds similarities and differences without being told what to look for.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-cyan-400 mb-2">✓ Advantages</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Works with abundant unlabeled data</li>
              <li>• Discovers unexpected patterns</li>
              <li>• No annotation cost</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-red-400 mb-2">✗ Challenges</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Harder to evaluate results</li>
              <li>• Less interpretable</li>
              <li>• Requires domain knowledge</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    layout: 'visual',
  },
  {
    id: 10,
    title: 'Unsupervised Learning: Code Example',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`# K-Means Clustering Example (Python)
from sklearn.cluster import KMeans
import numpy as np

# Customer data: Spending and Frequency
X = np.array([[100, 5], [200, 10], [150, 8],
              [50, 2], [300, 15], [250, 12]])

# Create and fit K-Means (3 clusters)
kmeans = KMeans(n_clusters=3, random_state=42)
clusters = kmeans.fit_predict(X)

print(f"Cluster assignments: {clusters}")
print(f"Cluster centers:\\n{kmeans.cluster_centers_}")`}
          </pre>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Real-World Use Case: Customer Segmentation</h4>
          <p className="text-gray-300 text-sm">Grouping customers by spending patterns and purchase frequency without predefined labels. Enables targeted marketing strategies for each segment.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 11,
    title: 'Unsupervised Learning: Real-World Case Study',
    subtitle: 'E-Commerce Customer Segmentation',
    content: (
      <div className="space-y-4">
        <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-500/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🛒</div>
            <div>
              <h4 className="font-bold text-cyan-300 mb-1">The Problem</h4>
              <p className="text-gray-300 text-sm">An e-commerce company has 2 million customers but no idea how to group them. Sending the same promotions to everyone wastes budget. K-Means clustering on purchase behavior reveals natural customer groups — with no labels needed.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-cyan-900/40 p-4 rounded-lg border border-cyan-500/40">
            <div className="text-2xl mb-2">💎</div>
            <h4 className="font-bold text-cyan-300 mb-2 text-sm">Cluster 1: VIP Buyers</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>Avg. spend: <span className="text-cyan-400">$850/mo</span></li>
              <li>Frequency: <span className="text-cyan-400">12× / month</span></li>
              <li>Recency: <span className="text-cyan-400">2 days ago</span></li>
              <li>Categories: <span className="text-cyan-400">Electronics, Fashion</span></li>
            </ul>
            <div className="mt-3 bg-cyan-900/30 p-2 rounded text-xs text-cyan-300">
              Strategy: Early access, loyalty rewards, premium support
            </div>
          </div>
          <div className="bg-purple-900/40 p-4 rounded-lg border border-purple-500/40">
            <div className="text-2xl mb-2">🛍️</div>
            <h4 className="font-bold text-purple-300 mb-2 text-sm">Cluster 2: Casual Shoppers</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>Avg. spend: <span className="text-purple-400">$120/mo</span></li>
              <li>Frequency: <span className="text-purple-400">2× / month</span></li>
              <li>Recency: <span className="text-purple-400">18 days ago</span></li>
              <li>Categories: <span className="text-purple-400">Home, Books</span></li>
            </ul>
            <div className="mt-3 bg-purple-900/30 p-2 rounded text-xs text-purple-300">
              Strategy: Discount coupons, bundle deals, re-engagement emails
            </div>
          </div>
          <div className="bg-amber-900/40 p-4 rounded-lg border border-amber-500/40">
            <div className="text-2xl mb-2">💤</div>
            <h4 className="font-bold text-amber-300 mb-2 text-sm">Cluster 3: Dormant Users</h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>Avg. spend: <span className="text-amber-400">$15/mo</span></li>
              <li>Frequency: <span className="text-amber-400">0.3× / month</span></li>
              <li>Recency: <span className="text-amber-400">90+ days ago</span></li>
              <li>Categories: <span className="text-amber-400">Varied</span></li>
            </ul>
            <div className="mt-3 bg-amber-900/30 p-2 rounded text-xs text-amber-300">
              Strategy: Win-back campaigns, "We miss you" offers
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-cyan-400 mb-2">📊 Business Impact</h4>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Email open rate', before: '12%', after: '31%' },
                { label: 'Conversion rate', before: '1.8%', after: '4.6%' },
                { label: 'Revenue per campaign', before: '$42K', after: '$118K' },
              ].map(({ label, before, after }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-gray-400">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-400 text-xs">{before}</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-green-400 text-xs font-bold">{after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-cyan-400 mb-2">🏢 Real Deployments</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Amazon</strong> — segments shoppers for personalized recommendations and deals</span></li>
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Spotify</strong> — clusters listeners by taste for Discover Weekly playlists</span></li>
              <li className="flex gap-2"><span className="text-cyan-400">→</span><span><strong>Netflix</strong> — groups viewers to optimize thumbnail A/B testing per segment</span></li>
            </ul>
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 12,
    title: 'Unsupervised Learning: Techniques & Algorithms',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-cyan-900/30 to-gray-900/30 p-6 rounded-lg border border-cyan-500/30">
          <h4 className="text-lg font-bold text-cyan-300 mb-3">Clustering</h4>
          <p className="text-gray-300 mb-3">Grouping similar data points together based on their characteristics</p>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400">
            <strong className="text-cyan-400">Types:</strong> Exclusive (K-means), Overlapping, Hierarchical, Probabilistic
          </div>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400 mt-2">
            <strong className="text-cyan-400">Algorithms:</strong> K-means, Hierarchical Clustering, DBSCAN, Gaussian Mixture Models
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-900/30 to-gray-900/30 p-6 rounded-lg border border-blue-500/30">
          <h4 className="text-lg font-bold text-blue-300 mb-3">Dimensionality Reduction</h4>
          <p className="text-gray-300 mb-3">Reducing the number of features while preserving important information</p>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400">
            <strong className="text-cyan-400">Methods:</strong> Principal Component Analysis (PCA), t-SNE, Autoencoders, UMAP
          </div>
          <div className="bg-gray-900/50 p-3 rounded text-sm text-gray-400 mt-2">
            <strong className="text-cyan-400">Use Cases:</strong> Visualization, Feature extraction, Noise reduction
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 13,
    title: 'Unsupervised Learning: Advantages & Limitations',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-3">✓ Advantages</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• No labeling cost or effort</li>
              <li>• Scales to large datasets</li>
              <li>• Discovers novel patterns</li>
              <li>• Useful for exploration</li>
              <li>• Handles unstructured data</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-bold text-red-400 mb-3">✗ Limitations</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Hard to evaluate quality</li>
              <li>• Results may be ambiguous</li>
              <li>• Requires domain expertise</li>
              <li>• Sensitive to parameters</li>
              <li>• Difficult to validate</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Key Insight</h4>
          <p className="text-gray-300 text-sm">Unsupervised learning is powerful for exploration and discovery but requires careful interpretation. Success depends on domain knowledge and problem understanding.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 14,
    title: 'Discovery-Based Learning',
    subtitle: 'Self-Directed Learning Through Exploration',
    content: (
      <div className="space-y-6">
        <DiscoveryViz />
        <div className="bg-amber-900/30 p-6 rounded-lg border-l-4 border-amber-500">
          <h4 className="font-bold text-amber-300 mb-3">Core Concept</h4>
          <p className="text-gray-300">Learning takes place without teacher or supervisor guidance. The learner discovers outcomes based on past experience and knowledge through exploration and inquiry.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-amber-400 mb-2">✓ Characteristics</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Self-directed exploration</li>
              <li>• Pattern discovery</li>
              <li>• Learner-driven inquiry</li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
            <p className="text-sm font-semibold text-amber-400 mb-2">🎯 Focus</p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Understanding relationships</li>
              <li>• Learning from problem-solving</li>
              <li>• Knowledge construction</li>
            </ul>
          </div>
        </div>
      </div>
    ),
    layout: 'visual',
  },
  {
    id: 15,
    title: 'Discovery-Based Learning: Code Example',
    content: (
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm overflow-x-auto">
          <pre className="text-gray-300">
{`# Exploratory Data Analysis (Python)
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('sales_data.csv')

# Discover patterns through exploration
print("Dataset shape:", df.shape)
print("\\nBasic statistics:")
print(df.describe())

# Explore relationships
print("\\nCorrelation matrix:")
print(df.corr())

# Visualize distributions
import matplotlib.pyplot as plt
df.hist(figsize=(12, 8))
plt.show()`}
          </pre>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Real-World Use Case: Data Science Exploration</h4>
          <p className="text-gray-300 text-sm">Analysts explore datasets without predefined hypotheses to understand data structure, identify anomalies, and generate insights for hypothesis formation.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 16,
    title: 'Discovery-Based Learning: Real-World Case Study',
    subtitle: 'Drug Interaction Discovery in Biomedical Research',
    content: (
      <div className="space-y-4">
        <div className="bg-amber-900/30 p-4 rounded-lg border border-amber-500/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🔬</div>
            <div>
              <h4 className="font-bold text-amber-300 mb-1">The Problem</h4>
              <p className="text-gray-300 text-sm">Pharmaceutical researchers have a database of 10,000+ compounds and millions of patient records. No one knows which drug combinations might be harmful — or beneficial. Discovery-based analysis explores this space without a predefined hypothesis, surfacing unexpected relationships.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-amber-400 mb-2">🔍 Exploration Process</h4>
              <ol className="text-sm text-gray-300 space-y-2">
                <li className="flex gap-2"><span className="text-amber-400 font-bold">1.</span><span>Load raw EHR data — no labels, no target variable</span></li>
                <li className="flex gap-2"><span className="text-amber-400 font-bold">2.</span><span>Profile distributions: age, dosage, co-prescriptions</span></li>
                <li className="flex gap-2"><span className="text-amber-400 font-bold">3.</span><span>Compute correlation matrix across 200+ drug features</span></li>
                <li className="flex gap-2"><span className="text-amber-400 font-bold">4.</span><span>Visualize with t-SNE — spot unexpected clusters</span></li>
                <li className="flex gap-2"><span className="text-amber-400 font-bold">5.</span><span>Flag anomalies: patients with unusual outcome patterns</span></li>
                <li className="flex gap-2"><span className="text-amber-400 font-bold">6.</span><span>Form hypothesis → hand off to supervised model</span></li>
              </ol>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-amber-400 mb-2">💡 Unexpected Discoveries</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex gap-2"><span className="text-green-400">✓</span><span>Drug A + Drug B → 40% faster recovery in elderly patients</span></li>
                <li className="flex gap-2"><span className="text-red-400">⚠</span><span>Drug C + Drug D → elevated cardiac risk in diabetics</span></li>
                <li className="flex gap-2"><span className="text-cyan-400">→</span><span>Dosage timing pattern linked to reduced side effects</span></li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-amber-400 mb-2">📈 From Discovery to Action</h4>
              <div className="space-y-2">
                {[
                  { phase: 'EDA', desc: 'Explore raw data, no assumptions', color: 'amber' },
                  { phase: 'Pattern ID', desc: 'Spot correlations & anomalies', color: 'amber' },
                  { phase: 'Hypothesis', desc: 'Form testable questions', color: 'cyan' },
                  { phase: 'Validation', desc: 'Supervised model confirms', color: 'blue' },
                  { phase: 'Clinical Trial', desc: 'Real-world testing', color: 'green' },
                ].map(({ phase, desc, color }) => (
                  <div key={phase} className={`flex items-center gap-3 p-2 rounded bg-${color}-900/20 border border-${color}-500/20`}>
                    <span className={`text-${color}-400 font-bold text-xs w-20 shrink-0`}>{phase}</span>
                    <span className="text-gray-300 text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-amber-400 mb-2">🏢 Real Deployments</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li className="flex gap-2"><span className="text-amber-400">→</span><span><strong>DeepMind AlphaFold</strong> — explored protein structure space with no labeled 3D structures</span></li>
                <li className="flex gap-2"><span className="text-amber-400">→</span><span><strong>NASA</strong> — discovered exoplanets by exploring Kepler telescope data patterns</span></li>
                <li className="flex gap-2"><span className="text-amber-400">→</span><span><strong>Google Brain</strong> — discovered new ML architectures through neural architecture search</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 17,
    title: 'Discovery-Based Learning: Applications & Methods',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-amber-900/30 to-gray-900/30 p-4 rounded-lg border border-amber-500/30">
          <h4 className="font-bold text-amber-300 mb-2">Exploratory Data Analysis (EDA)</h4>
          <p className="text-gray-300 text-sm">Understanding data structure and relationships without predefined hypotheses. Discovering outliers, patterns, and data quality issues.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-900/30 to-gray-900/30 p-4 rounded-lg border border-amber-500/30">
          <h4 className="font-bold text-amber-300 mb-2">Knowledge Discovery in Databases</h4>
          <p className="text-gray-300 text-sm">Mining databases to find previously unknown patterns and insights. Useful for competitive intelligence and market analysis.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-900/30 to-gray-900/30 p-4 rounded-lg border border-amber-500/30">
          <h4 className="font-bold text-amber-300 mb-2">Learning by Problem-Solving</h4>
          <p className="text-gray-300 text-sm">Discovering solutions through iterative problem-solving processes. Developing intuition and understanding through hands-on experimentation.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-900/30 to-gray-900/30 p-4 rounded-lg border border-amber-500/30">
          <h4 className="font-bold text-amber-300 mb-2">Scientific Discovery</h4>
          <p className="text-gray-300 text-sm">Uncovering new scientific principles through experimentation and observation. Hypothesis generation from empirical data.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 18,
    title: 'Discovery-Based Learning: Advantages & Limitations',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-3">✓ Advantages</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Generates novel insights</li>
              <li>• No predefined bias</li>
              <li>• Flexible and adaptive</li>
              <li>• Encourages critical thinking</li>
              <li>• Low cost exploration</li>
            </ul>
          </div>
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
            <h4 className="font-bold text-red-400 mb-3">✗ Limitations</h4>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>• Time-consuming process</li>
              <li>• Requires expertise to interpret</li>
              <li>• Results can be subjective</li>
              <li>• May miss important patterns</li>
              <li>• Difficult to reproduce</li>
            </ul>
          </div>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h4 className="font-bold text-cyan-400 mb-2">Key Insight</h4>
          <p className="text-gray-300 text-sm">Discovery-based learning is ideal for initial exploration and hypothesis generation. It complements supervised and unsupervised methods in a complete data science workflow.</p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 19,
    title: 'Comparison: All Three Paradigms',
    content: (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-900/30 p-4 rounded-lg border-2 border-blue-500/50">
            <h4 className="font-bold text-blue-300 mb-3">Supervised</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-blue-400">Data:</strong> Labeled</p>
              <p><strong className="text-blue-400">Guidance:</strong> With teacher</p>
              <p><strong className="text-blue-400">Goal:</strong> Predict outputs</p>
              <p><strong className="text-blue-400">Cost:</strong> High (labeling)</p>
              <p><strong className="text-blue-400">Accuracy:</strong> High</p>
              <p><strong className="text-blue-400">Interpretability:</strong> High</p>
            </div>
          </div>
          <div className="bg-cyan-900/30 p-4 rounded-lg border-2 border-cyan-500/50">
            <h4 className="font-bold text-cyan-300 mb-3">Unsupervised</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-cyan-400">Data:</strong> Unlabeled</p>
              <p><strong className="text-cyan-400">Guidance:</strong> No teacher</p>
              <p><strong className="text-cyan-400">Goal:</strong> Find patterns</p>
              <p><strong className="text-cyan-400">Cost:</strong> Low</p>
              <p><strong className="text-cyan-400">Accuracy:</strong> Subjective</p>
              <p><strong className="text-cyan-400">Interpretability:</strong> Medium</p>
            </div>
          </div>
          <div className="bg-amber-900/30 p-4 rounded-lg border-2 border-amber-500/50">
            <h4 className="font-bold text-amber-300 mb-3">Discovery-Based</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong className="text-amber-400">Data:</strong> Unlabeled</p>
              <p><strong className="text-amber-400">Guidance:</strong> Self-directed</p>
              <p><strong className="text-amber-400">Goal:</strong> Discover knowledge</p>
              <p><strong className="text-amber-400">Cost:</strong> Low</p>
              <p><strong className="text-amber-400">Accuracy:</strong> Process-oriented</p>
              <p><strong className="text-amber-400">Interpretability:</strong> High</p>
            </div>
          </div>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 20,
    title: 'Choosing the Right Paradigm',
    content: (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-6 rounded-lg border-l-4 border-cyan-500">
          <h4 className="font-bold text-cyan-300 mb-4">Decision Framework:</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">1.</span>
              <span><strong>Do I have labeled data?</strong> → Supervised Learning for prediction</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">2.</span>
              <span><strong>Need to discover patterns?</strong> → Unsupervised Learning for exploration</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">3.</span>
              <span><strong>Want to understand data?</strong> → Discovery-Based for insights</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">4.</span>
              <span><strong>Budget constraints?</strong> Unsupervised/Discovery are cost-effective</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cyan-400 font-bold mt-1">5.</span>
              <span><strong>Interpretability needed?</strong> Supervised or Discovery-Based preferred</span>
            </li>
          </ul>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 21,
    title: 'Key Takeaways',
    content: (
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 p-5 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-bold text-blue-300 mb-2">Supervised Learning</h4>
          <p className="text-gray-300 text-sm">Best for prediction tasks with labeled data. Provides high accuracy but requires expensive annotation. Ideal for well-defined problems.</p>
        </div>
        <div className="bg-gradient-to-r from-cyan-900/40 to-cyan-800/20 p-5 rounded-lg border-l-4 border-cyan-500">
          <h4 className="font-bold text-cyan-300 mb-2">Unsupervised Learning</h4>
          <p className="text-gray-300 text-sm">Ideal for pattern discovery and exploration. Works with abundant unlabeled data but requires careful interpretation. Great for initial data exploration.</p>
        </div>
        <div className="bg-gradient-to-r from-amber-900/40 to-amber-800/20 p-5 rounded-lg border-l-4 border-amber-500">
          <h4 className="font-bold text-amber-300 mb-2">Discovery-Based Learning</h4>
          <p className="text-gray-300 text-sm">Emphasizes exploration and self-directed inquiry. Valuable for understanding data and discovering new insights. Complements other methods.</p>
        </div>
        <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700 mt-4">
          <p className="text-gray-300 font-semibold">
            💡 <strong className="text-cyan-400">Remember:</strong> The best paradigm depends on your specific problem, available data, and business goals. Often, a combination of approaches yields the best results.
          </p>
        </div>
      </div>
    ),
    layout: 'content',
  },
  {
    id: 22,
    title: 'Thank You',
    subtitle: 'Machine Learning Paradigms — Seminar Summary',
    content: null, // injected by the Home component
    layout: 'title',
  },
];

function FinalSlideContent() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-8">
      {/* Decorative rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-48 h-48 rounded-full border border-cyan-500/10 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute w-36 h-36 rounded-full border border-cyan-500/20" />
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border border-cyan-500/40 flex items-center justify-center text-5xl">
          🎓
        </div>
      </div>

      <div className="space-y-3 max-w-xl">
        <p className="text-xl text-gray-300 leading-relaxed">
          We explored <span className="text-blue-400 font-semibold">Supervised</span>,{' '}
          <span className="text-cyan-400 font-semibold">Unsupervised</span>, and{' '}
          <span className="text-amber-400 font-semibold">Discovery-Based</span> learning —
          the three paradigms that power modern AI. Thanks for attending this seminar. 
        </p>
      </div>

      <div className="bg-gray-800/40 border border-gray-700 rounded-lg px-6 py-5 max-w-2xl w-full">
        <p className="text-gray-300 text-sm mb-4">
          Presented by:
        </p>
        <ul className="space-y-2 text-left">
          <li className="text-cyan-300">
            Harsh Dubey <span className="text-gray-400">(RA2411033010002)</span>
          </li>
          <li className="text-cyan-300">
            Mridula Manoj <span className="text-gray-400">(RA2411033010012)</span>
          </li>
          <li className="text-cyan-300">
            Abhiraj Bhowmick <span className="text-gray-400">(RA2411033010013)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const slideContent = isLastSlide ? (
    <FinalSlideContent />
  ) : (
    slide.content
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 flex flex-col">
      {/* Hero Background for first slide */}
      {currentSlide === 0 && (
        <div
          className="absolute inset-0 -z-10 opacity-20"
          style={{
            backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663339964842/QAwu6ECmmMF9cVbna7HexN/ml-hero-background-Gh37cnfsvXPzNWrCg2RusQ.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      {/* Main Content */}
      <main
        className="flex-1 flex flex-col justify-center px-8 py-12 max-w-6xl mx-auto w-full"
      >
        {/* Slide Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-cyan-400 mb-2">{slide.title}</h1>
          {slide.subtitle && (
            <p className="text-xl text-cyan-300 font-medium">{slide.subtitle}</p>
          )}
          <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-500 mt-4 rounded-full" />
        </div>

        {/* Slide Content */}
        <div className="flex-1 mb-12">{slideContent}</div>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-gray-900/50 border-t border-gray-800 px-8 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-sm text-gray-400 font-medium">
            Slide <span className="font-bold text-cyan-400">{currentSlide + 1}</span> of{' '}
            <span className="font-bold text-cyan-400">{slides.length}</span>
          </div>

          <div className="flex-1 mx-8 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={goToPrevious}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700 hover:border-cyan-500 hover:text-cyan-400 transition-all duration-200 font-medium"
              title="Previous slide (← Arrow Key)"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            <button
              onClick={goToNext}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-200 font-medium"
              title="Next slide (→ Arrow Key)"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-4 text-xs text-gray-500 text-center">
          💡 Tip: Use arrow keys (← →) or buttons to navigate
        </div>
      </footer>
    </div>
  );
}
