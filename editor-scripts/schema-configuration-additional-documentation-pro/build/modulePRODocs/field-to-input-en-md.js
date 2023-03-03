(window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentationPRO=window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentationPRO||[]).push([[14],{59:function(s,a){s.exports='<h1 id="field-to-input">Field to Input</h1> <p>Retrieve the value of a field, manipulate it, and input it into another field, all within the same query.</p> <h2 id="description">Description</h2> <p>The field to obtain the value from is referenced using the &quot;Variable&quot; syntax <code>$</code>, and <code>__</code> before the field alias or name. (For instance, the value from field <code>excerpt</code> is referenced as <code>$__excerpt</code>.) The response from the second field can itself be used as input to another field:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt\n\n    <span class="hljs-comment"># Referencing previous field with name &quot;excerpt&quot;</span>\n    <span class="hljs-symbol">isEmptyExcerpt</span><span class="hljs-punctuation">:</span> _isEmpty<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__excerpt</span>)\n\n    <span class="hljs-comment"># Referencing previous field with alias &quot;isEmptyExcerpt&quot;</span>\n    <span class="hljs-symbol">isNotEmptyExcerpt</span><span class="hljs-punctuation">:</span> _not<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__isEmptyExcerpt</span>)\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The response will be:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;posts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;excerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Some post excerpt&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;isEmptyExcerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;isNotEmptyExcerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>\n      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;excerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;isEmptyExcerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;isNotEmptyExcerpt&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">]</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The field can only be referenced by any of its previous sibling fields in the same node. The following queries will NOT work:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-comment"># This will fail because the reference to the field must appear after the field, not before</span>\n<span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    <span class="hljs-symbol">isEmptyExcerpt</span><span class="hljs-punctuation">:</span> _isEmpty<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__excerpt</span>)\n    excerpt\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span>\n\n<span class="hljs-comment"># This will fail because the reference must be done within the same node</span>\n<span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    excerpt\n  <span class="hljs-punctuation">}</span>\n  <span class="hljs-symbol">isEmptyExcerpt</span><span class="hljs-punctuation">:</span> _isEmpty<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__excerpt</span>)\n<span class="hljs-punctuation">}</span></span></code></pre> <p>The field also cannot be referenced from a directive argument (for that, use the <strong>Pass Onwards Directive</strong>):</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-comment"># This will fail because the reference can be only used as input to a field, not to a directive</span>\n<span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    hasComments\n    title <span class="hljs-meta">@include</span><span class="hljs-punctuation">(</span><span class="hljs-symbol">if</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__hasComments</span>)\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <h2 id="examples">Examples</h2> <p>If the post&#39;s excerpt is empty, use the title instead:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    title\n    <span class="hljs-symbol">originalExcerpt</span><span class="hljs-punctuation">:</span> excerpt\n    <span class="hljs-symbol">isEmptyExcerpt</span><span class="hljs-punctuation">:</span> _isEmpty<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__originalExcerpt</span>)\n    <span class="hljs-symbol">excerpt</span><span class="hljs-punctuation">:</span> _if<span class="hljs-punctuation">(</span><span class="hljs-symbol">condition</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__isEmptyExcerpt</span>, <span class="hljs-symbol">then</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__title</span>, <span class="hljs-symbol">else</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__originalExcerpt</span>)\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Retrieve data from an external REST endpoint, and manipulate its data to suit your requirements.</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">externalData</span><span class="hljs-punctuation">:</span> _requestJSONObjectItem<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">url</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://example.com/rest/some-external-endpoint&quot;</span><span class="hljs-punctuation">}</span> <span class="hljs-punctuation">)</span>\n  <span class="hljs-symbol">userName</span><span class="hljs-punctuation">:</span> _objectProperty<span class="hljs-punctuation">(</span><span class="hljs-symbol">object</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__externalData</span>, <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;data.user.name&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n  <span class="hljs-symbol">userLastName</span><span class="hljs-punctuation">:</span> _objectProperty<span class="hljs-punctuation">(</span><span class="hljs-symbol">object</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__externalData</span>, <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;data.user.surname&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>This will produce:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;externalData&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n      <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;user&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Leo&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;surname&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Loso&quot;</span>\n        <span class="hljs-punctuation">}</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;userName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Leo&quot;</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;userLastName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Loso&quot;</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Using the <code>@remove</code> directive on <code>externalData</code>, we can also avoid printing the external endpoint source data in the response:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">externalData</span><span class="hljs-punctuation">:</span> _requestJSONObjectItem<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">url</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://example.com/rest/some-external-endpoint&quot;</span> <span class="hljs-punctuation">}</span> <span class="hljs-punctuation">)</span> <span class="hljs-meta">@remove</span>\n  <span class="hljs-symbol">userName</span><span class="hljs-punctuation">:</span> _objectProperty<span class="hljs-punctuation">(</span><span class="hljs-symbol">object</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__externalData</span>, <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;data.user.name&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n  <span class="hljs-symbol">userLastName</span><span class="hljs-punctuation">:</span> _objectProperty<span class="hljs-punctuation">(</span><span class="hljs-symbol">object</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__externalData</span>, <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;data.user.surname&quot;</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>This will now produce:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;userName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Leo&quot;</span><span class="hljs-punctuation">,</span>\n    <span class="hljs-attr">&quot;userLastName&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Loso&quot;</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Retrieve the posts for every user that mention the user&#39;s email:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  users <span class="hljs-punctuation">{</span>\n    email\n    posts<span class="hljs-punctuation">(</span><span class="hljs-symbol">filter</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">search</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__email</span> <span class="hljs-punctuation">}</span><span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n      id\n      title\n    <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Send a newsletter defining the <code>to</code> and <code>from</code> emails through the <code>optionValue</code> field:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-keyword">mutation</span> <span class="hljs-punctuation">{</span>\n  <span class="hljs-symbol">fromEmail</span><span class="hljs-punctuation">:</span> optionValue<span class="hljs-punctuation">(</span><span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;admin_email&quot;</span><span class="hljs-punctuation">)</span>\n  <span class="hljs-symbol">toEmail</span><span class="hljs-punctuation">:</span> optionValue<span class="hljs-punctuation">(</span><span class="hljs-symbol">name</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;subscribers_email_list_recipient_address&quot;</span><span class="hljs-punctuation">)</span>\n  sendEmail<span class="hljs-punctuation">(</span>\n    <span class="hljs-symbol">from</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__fromEmail</span>\n    <span class="hljs-symbol">to</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__toEmail</span>\n    <span class="hljs-symbol">subject</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Weekly summary&quot;</span>\n    <span class="hljs-symbol">content</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;...&quot;</span>\n  <span class="hljs-punctuation">)</span>\n<span class="hljs-punctuation">}</span></span></code></pre> '}}]);