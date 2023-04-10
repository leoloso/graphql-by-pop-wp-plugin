(window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentation=window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentation||[]).push([[16],{62:function(s,a){s.exports='<h1 id="default-directive">Default Directive</h1> <p><code>@default</code> directive, to set a value to null or empty fields</p> <h2 id="description">Description</h2> <p>Directive <code>@default</code> accepts two arguments:</p> <ol> <li><code>value</code>: the default value, from any scalar type (string, boolean, integer, float or ID).</li> <li><code>condition</code>: if the field must be null or empty, via enum values <code>IS_NULL</code> or <code>IS_EMPTY</code>. By default it is null.</li> </ol> <p>In the example below, when a post does not have a featured image, field <code>featuredImage</code> returns <code>null</code>:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    featuredImage <span class="hljs-punctuation">{</span>\n      id\n      src\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;featuredImage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">null</span></span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>By using <code>@default</code>, we can then retrieve some default image:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  post<span class="hljs-punctuation">(</span><span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">id</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    featuredImage <span class="hljs-meta">@default</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-number">55</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n      id\n      src\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;post&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;featuredImage&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">55</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;src&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://mysite.com/wp-content/uploads/my-default-image.png&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> '}}]);