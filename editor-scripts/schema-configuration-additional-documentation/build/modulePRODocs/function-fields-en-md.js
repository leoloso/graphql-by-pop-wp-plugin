(window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentation=window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentation||[]).push([[22],{68:function(s,a){s.exports='<h1 id="function-fields">Function Fields</h1> <p>Manipulate the field output using standard programming language functions (provided via special fields)</p> <h2 id="description">Description</h2> <p>This module adds several fields to the GraphQL schema which expose functionalities commonly found in programming languages (such as PHP).</p> <p>Function fields are <strong>Global Fields</strong>, hence they are added to every single type in the GraphQL schema: in <code>QueryRoot</code>, but also in <code>Post</code>, <code>User</code>, etc.</p> <p>Function fields are useful for manipulating the data once it has been retrieved, allowing us to transform a field value in whatever way it is required, and granting us powerful data import/export capabilities.</p> <h2 id="available-function-fields">Available Function Fields</h2> <p>This is the list of currently-available function fields.</p> <h3 id="_and"><code>_and</code></h3> <p>Return an <code>AND</code> operation among several boolean properties.</p> <h3 id="_arrayadditem"><code>_arrayAddItem</code></h3> <p>Adds an element to the array.</p> <h3 id="_arraysetitem"><code>_arraySetItem</code></h3> <p>Sets an element on some position of the array.</p> <h3 id="_arraychunk"><code>_arrayChunk</code></h3> <p>Split an array into chunks.</p> <h3 id="_arraydiff"><code>_arrayDiff</code></h3> <p>Return an array containing all the elements from the first array which are not present on any of the other arrays.</p> <h3 id="_arrayfill"><code>_arrayFill</code></h3> <p>Create an array filled with values.</p> <h3 id="_arrayinnerjoinjsonobjectproperties"><code>_arrayInnerJoinJSONObjectProperties</code></h3> <p>Fill the JSON objects inside a target array with properties from a JSON object from a source array, where a certain property is the same for both objects.</p> <h3 id="_arrayitem"><code>_arrayItem</code></h3> <p>Access the element on the given position in the array.</p> <h3 id="_arrayjoin"><code>_arrayJoin</code></h3> <p>Join all the strings in an array, using a provided separator.</p> <h3 id="_arraylength"><code>_arrayLength</code></h3> <p>Number of elements in an array.</p> <h3 id="_arraymerge"><code>_arrayMerge</code></h3> <p>Merge two or more arrays together.</p> <h3 id="_arraypad"><code>_arrayPad</code></h3> <p>Pad an array to the specified length with a value.</p> <h3 id="_arrayrandom"><code>_arrayRandom</code></h3> <p>Randomly select one element from the provided ones.</p> <h3 id="_arrayremovefirst"><code>_arrayRemoveFirst</code></h3> <p>Remove the first element in the array.</p> <h3 id="_arrayremovelast"><code>_arrayRemoveLast</code></h3> <p>Remove the last element in the array.</p> <h3 id="_arrayreverse"><code>_arrayReverse</code></h3> <p>Reverse an array.</p> <h3 id="_arraysearch"><code>_arraySearch</code></h3> <p>Search in what position is an element placed in the array. If found, it returns its position, otherwise it returns <code>false</code>.</p> <h3 id="_arrayslice"><code>_arraySlice</code></h3> <p>Extract a slice of an array.</p> <h3 id="_arraysplice"><code>_arraySplice</code></h3> <p>Remove a portion of an array and replace it with something else.</p> <h3 id="_arrayunique"><code>_arrayUnique</code></h3> <p>Filters out all duplicated elements in the array.</p> <h3 id="_clientip"><code>_clientIP</code></h3> <p>Retrieves the client IP address. If the server is not properly configured (see below), the response is <code>null</code>.</p> <h4 id="configuration">Configuration</h4> <p>The client&#39;s IP address is retrieved from under the <code>$_SERVER</code> global variable, normally from under property <code>&#39;REMOTE_ADDR&#39;</code>. However, different platforms may require to use a different property name to retrieve this information.</p> <p>For instance:</p> <ul> <li>Cloudflare might use <code>&#39;HTTP_CF_CONNECTING_IP&#39;</code></li> <li>AWS might use <code>&#39;HTTP_X_FORWARDED_FOR&#39;</code></li> </ul> <p>The property name to use can be configured in the &quot;Plugin Settings &gt; Server IP Configuration&quot; tab on the Settings page:</p> <p><img src="https://raw.githubusercontent.com/leoloso/PoP/master/layers/GraphQLAPIForWP/plugins/graphql-api-for-wp/docs/implicit-features//../../images/settings-general-client-ip-address-server-property-name.png" alt="Configuring the $_SERVER property name to retrieve the client IP" title="Configuring the $_SERVER property name to retrieve the client IP"></p> <h3 id="_echo"><code>_echo</code></h3> <p>Repeat back the input, whatever it is.</p> <h3 id="_equals"><code>_equals</code></h3> <p>Indicate if the result from a field equals a certain value.</p> <h3 id="_fail"><code>_fail</code></h3> <p>Create an entry under the response&#39;s <code>errors</code>.</p> \x3c!-- ### `_floatDivide`\n\nDivide a number by another number. --\x3e <h3 id="_greaterthan"><code>_greaterThan</code></h3> <p>Indicate if number1 &gt; number2.</p> <h3 id="_greaterthanorequals"><code>_greaterThanOrEquals</code></h3> <p>Indicate if number1 &gt;= number2.</p> <h3 id="_if"><code>_if</code></h3> <p>If a boolean property is true, execute a field, else, execute another field.</p> <h3 id="_inarray"><code>_inArray</code></h3> <p>Indicate if the array contains the value</p> <h3 id="_intadd"><code>_intAdd</code></h3> <p>Add an integer to another integer number.</p> <h3 id="_intarraysum"><code>_intArraySum</code></h3> <p>Sum of the integer elements in the array.</p> <h3 id="_isempty"><code>_isEmpty</code></h3> <p>Indicate if a value is empty.</p> <h3 id="_isnull"><code>_isNull</code></h3> <p>Indicate if a value is null.</p> <h3 id="_lowerthan"><code>_lowerThan</code></h3> <p>Indicate if number1 &lt; number2.</p> <h3 id="_lowerthanorequals"><code>_lowerThanOrEquals</code></h3> <p>Indicate if number1 &lt;= number2.</p> <h3 id="_not"><code>_not</code></h3> <p>Return the opposite value of a boolean property.</p> <h3 id="_notempty"><code>_notEmpty</code></h3> <p>Indicate if the value is not empty.</p> <h3 id="_notequals"><code>_notEquals</code></h3> <p>Are the two values not equal to each other.</p> <h3 id="_notinarray"><code>_notInArray</code></h3> <p>Indicate if the array does not contain the value.</p> <h3 id="_notnull"><code>_notNull</code></h3> <p>Indicate if the value is not <code>null</code>.</p> <h3 id="_objectaddentry"><code>_objectAddEntry</code></h3> <p>Adds an entry to the object.</p> <h3 id="_objectcombine"><code>_objectCombine</code></h3> <p>Create a JSON object using the elements from an array as keys, and the elements from another array as values.</p> <h3 id="_objectproperty"><code>_objectProperty</code></h3> <p>Retrieve a property from a JSON object.</p> <h3 id="_objectremoveentry"><code>_objectRemoveEntry</code></h3> <p>Removes an entry from the object.</p> <h3 id="_or"><code>_or</code></h3> <p>Return an <code>OR</code> operation among several boolean properties.</p> <h3 id="_propertyexistsinjsonobject"><code>_propertyExistsInJSONObject</code></h3> <p>Indicate if a property exists on a JSON object.</p> <h3 id="_propertyissetinjsonobject"><code>_propertyIsSetInJSONObject</code></h3> <p>Indicate if a property exists and is not <code>null</code> on a JSON object.</p> <h3 id="_sprintf"><code>_sprintf</code></h3> <p>Replace placeholders inside a string with provided values.</p> <h3 id="_strappend"><code>_strAppend</code></h3> <p>Append a string to another string.</p> <h3 id="_strcontains"><code>_strContains</code></h3> <p>Indicates if a string contains another string.</p> <h3 id="_strendswith"><code>_strEndsWith</code></h3> <p>Indicates if a string ends with another string.</p> <h3 id="_strlength"><code>_strLength</code></h3> <p>Length of the string</p> <h3 id="_strlowercase"><code>_strLowerCase</code></h3> <p>Transform a string to lower case.</p> <h3 id="_strpad"><code>_strPad</code></h3> <p>Pad a string to a certain length with another string</p> <h3 id="_strpos"><code>_strPos</code></h3> <p>Position of a substring within the string, or <code>null</code> if not found</p> <h3 id="_strregexreplace"><code>_strRegexReplace</code></h3> <p>Execute a regular expression to search and replace a string.</p> <h3 id="_strrepeat"><code>_strRepeat</code></h3> <p>Repeat a string</p> <h3 id="_strreplace"><code>_strReplace</code></h3> <p>Replace a string with another string.</p> <h3 id="_strreverse"><code>_strReverse</code></h3> <p>Reverse a string.</p> <h3 id="_strshuffle"><code>_strShuffle</code></h3> <p>Randomly shuffles a string</p> <h3 id="_strstartswith"><code>_strStartsWith</code></h3> <p>Indicates if a string starts with another string.</p> <h3 id="_strstripslashes"><code>_strStripSlashes</code></h3> <p>Returns a string with backslashes stripped off. (\\&#39; becomes &#39; and so on.) Double backslashes (\\\\) are made into a single backslash (\\).</p> <h3 id="_strsubstr"><code>_strSubstr</code></h3> <p>Return part of a string</p> <h3 id="_strtitlecase"><code>_strTitleCase</code></h3> <p>Transform a string to title case.</p> <h3 id="_strtotime"><code>_strToTime</code></h3> <p>Parse about any English textual datetime description into a Unix timestamp</p> <h3 id="_strtrim"><code>_strTrim</code></h3> <p>Strip whitespace (or other characters) from the beginning and end of a string.</p> <h3 id="_struppercase"><code>_strUpperCase</code></h3> <p>Transform a string to upper case.</p> <h3 id="_strwordcount"><code>_strWordCount</code></h3> <p>Number of words in the string</p> <h3 id="_time"><code>_time</code></h3> <p>Return the time now.</p> <h2 id="examples">Examples</h2> <p>While we have a <code>Post.hasComments</code> fields, we may need the opposite value. Instead of creating a new field <code>Post.notHasComments</code> (for which we&#39;d need to edit PHP code), we can use the <strong>Field to Input</strong> feature to input the value from <code>hasComments</code> into a <code>not</code> field, thus calculating the new value always within the GraphQL query:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    id\n    hasComments\n    <span class="hljs-symbol">notHasComments</span><span class="hljs-punctuation">:</span> _not<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__hasComments</span>)\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>We can apply function fields multiple times to perform a more complex calculation, such as generating a <code>summary</code> field based on the values from other fields:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  posts <span class="hljs-punctuation">{</span>\n    id\n    content <span class="hljs-meta">@remove</span>\n    <span class="hljs-symbol">shortContent</span><span class="hljs-punctuation">:</span> _strSubstr<span class="hljs-punctuation">(</span><span class="hljs-symbol">string</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__content</span>, <span class="hljs-symbol">offset</span><span class="hljs-punctuation">:</span> <span class="hljs-number">0</span>, <span class="hljs-symbol">length</span><span class="hljs-punctuation">:</span> <span class="hljs-number">150</span><span class="hljs-punctuation">)</span> <span class="hljs-meta">@remove</span>\n    excerpt <span class="hljs-meta">@remove</span>\n    <span class="hljs-symbol">isExcerptEmpty</span><span class="hljs-punctuation">:</span> _isEmpty<span class="hljs-punctuation">(</span><span class="hljs-symbol">value</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__excerpt</span>) <span class="hljs-meta">@remove</span>\n    <span class="hljs-symbol">summary</span><span class="hljs-punctuation">:</span> _if<span class="hljs-punctuation">(</span>\n      <span class="hljs-symbol">condition</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__isExcerptEmpty</span>\n      <span class="hljs-symbol">then</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__content</span>\n      <span class="hljs-symbol">else</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__excerpt</span>\n    <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>Together with the <strong>Send HTTP Request Fields</strong> module, we can dynamically generate an API endpoint to connect to (based on the data on our site), and then extract some specific field from the returned data:</p> <pre><code class="hljs language-graphql"><span class="hljs"><span class="hljs-punctuation">{</span>\n  users<span class="hljs-punctuation">(</span>\n    <span class="hljs-symbol">pagination</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">limit</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span> <span class="hljs-punctuation">}</span>,\n    <span class="hljs-symbol">sort</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">order</span><span class="hljs-punctuation">:</span> ASC, <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> ID <span class="hljs-punctuation">}</span>\n  <span class="hljs-punctuation">)</span> <span class="hljs-punctuation">{</span>\n    id\n\n    <span class="hljs-comment"># Dynamically generate endpoint for the user</span>\n    <span class="hljs-symbol">endpoint</span><span class="hljs-punctuation">:</span> _arrayJoin<span class="hljs-punctuation">(</span><span class="hljs-symbol">values</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users/&quot;</span>,\n      <span class="hljs-variable">$__id</span>,\n      <span class="hljs-string">&quot;?_fields=name,avatar_urls&quot;</span>\n    <span class="hljs-punctuation">]</span><span class="hljs-punctuation">)</span>\n\n    <span class="hljs-comment"># Retrieve the endpoint data</span>\n    <span class="hljs-symbol">endpointData</span><span class="hljs-punctuation">:</span> _requestJSONObjectItem<span class="hljs-punctuation">(</span><span class="hljs-symbol">input</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span> <span class="hljs-symbol">url</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__endpoint</span> <span class="hljs-punctuation">}</span> <span class="hljs-punctuation">)</span>\n\n    <span class="hljs-comment"># Extract specific information</span>\n    <span class="hljs-symbol">userAvatar</span><span class="hljs-punctuation">:</span> _objectProperty<span class="hljs-punctuation">(</span>\n      <span class="hljs-symbol">object</span><span class="hljs-punctuation">:</span> <span class="hljs-variable">$__endpointData</span>,\n      <span class="hljs-symbol">by</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n        <span class="hljs-symbol">path</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;avatar_urls.48&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">)</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> <p>...producing:</p> <pre><code class="hljs language-json"><span class="hljs"><span class="hljs-punctuation">{</span>\n  <span class="hljs-attr">&quot;data&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n    <span class="hljs-attr">&quot;users&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;endpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users/1?_fields=name,avatar_urls&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;endpointData&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;leo&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;avatar_urls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-attr">&quot;24&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/b28085726ee66e49f08be16ad668efd5?s=24&amp;d=mm&amp;r=g&quot;</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;48&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/b28085726ee66e49f08be16ad668efd5?s=48&amp;d=mm&amp;r=g&quot;</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;96&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/b28085726ee66e49f08be16ad668efd5?s=96&amp;d=mm&amp;r=g&quot;</span>\n          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;_links&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-attr">&quot;self&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n              <span class="hljs-punctuation">{</span>\n                <span class="hljs-attr">&quot;href&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users/1&quot;</span>\n              <span class="hljs-punctuation">}</span>\n            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;collection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n              <span class="hljs-punctuation">{</span>\n                <span class="hljs-attr">&quot;href&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users&quot;</span>\n              <span class="hljs-punctuation">}</span>\n            <span class="hljs-punctuation">]</span>\n          <span class="hljs-punctuation">}</span>\n        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;userAvatar&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/b28085726ee66e49f08be16ad668efd5?s=48&amp;d=mm&amp;r=g&quot;</span>\n      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n      <span class="hljs-punctuation">{</span>\n        <span class="hljs-attr">&quot;id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;endpoint&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users/2?_fields=name,avatar_urls&quot;</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;endpointData&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n          <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;themedemos&quot;</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;avatar_urls&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-attr">&quot;24&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/7554514b65216821eeacde0fdcd6c6e6?s=24&amp;d=mm&amp;r=g&quot;</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;48&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/7554514b65216821eeacde0fdcd6c6e6?s=48&amp;d=mm&amp;r=g&quot;</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;96&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/7554514b65216821eeacde0fdcd6c6e6?s=96&amp;d=mm&amp;r=g&quot;</span>\n          <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n          <span class="hljs-attr">&quot;_links&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>\n            <span class="hljs-attr">&quot;self&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n              <span class="hljs-punctuation">{</span>\n                <span class="hljs-attr">&quot;href&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users/2&quot;</span>\n              <span class="hljs-punctuation">}</span>\n            <span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>\n            <span class="hljs-attr">&quot;collection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>\n              <span class="hljs-punctuation">{</span>\n                <span class="hljs-attr">&quot;href&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://newapi.getpop.org/wp-json/wp/v2/users&quot;</span>\n              <span class="hljs-punctuation">}</span>\n            <span class="hljs-punctuation">]</span>\n          <span class="hljs-punctuation">}</span>\n        <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>\n        <span class="hljs-attr">&quot;userAvatar&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;https://secure.gravatar.com/avatar/7554514b65216821eeacde0fdcd6c6e6?s=48&amp;d=mm&amp;r=g&quot;</span>\n      <span class="hljs-punctuation">}</span>\n    <span class="hljs-punctuation">]</span>\n  <span class="hljs-punctuation">}</span>\n<span class="hljs-punctuation">}</span></span></code></pre> '}}]);