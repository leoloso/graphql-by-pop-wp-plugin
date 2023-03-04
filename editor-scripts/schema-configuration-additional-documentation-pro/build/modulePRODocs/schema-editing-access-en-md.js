(window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentationPRO=window.webpackJsonpGraphQLAPISchemaConfigurationAdditionalDocumentationPRO||[]).push([[26],{71:function(t,e){t.exports='<h1 id="schema-editing-access">Schema Editing Access</h1> <p>Grant access to users other than admins to edit the GraphQL schema</p> <h2 id="description">Description</h2> <p>By default, only users with the <code>admin</code> role have access to the different screens of plugin GraphQL API for WordPress in the admin.</p> <p>This module <code>Schema Editing Access</code> enables to grant non-admin users access to the GraphiQL and Interactive schema clients in the admin, and to read or write the different Custom Post Types from this plugin:</p> <ul> <li>Persisted Queries</li> <li>Custom Endpoints</li> <li>Schema Configurations</li> <li>Access Control Lists</li> <li>Cache Control Lists</li> <li>Field Deprecation Lists</li> </ul> <p>What permissions are given to non-admin users follows the same <a href="https://wordpress.org/support/article/roles-and-capabilities/#summary-of-roles" target="_blank">scheme as when editing posts in WordPress</a>, where users with different roles (<code>subscriber</code>, <code>contributor</code>, <code>author</code> and <code>editor</code>) have access to different capabilities:</p> <table> <thead> <tr> <th>Role</th> <th>Capabilities</th> </tr> </thead> <tbody><tr> <td>Editor</td> <td>Can publish and manage posts including the posts of other users</td> </tr> <tr> <td>Author</td> <td>Can publish and manage their own posts</td> </tr> <tr> <td>Contributor</td> <td>Can write and manage their own posts but cannot publish them</td> </tr> <tr> <td>Subscriber</td> <td>Can only read posts</td> </tr> </tbody></table> <p>For instance, a contributor can create, but not publish, custom endpoints:</p> <p><img src="https://raw.githubusercontent.com/leoloso/PoP/master/layers/GraphQLAPIForWP/plugins/graphql-api-for-wp/docs-pro/implicit-features//../../images/new-custom-endpoint-by-contributor.png" alt="Custom endpoint by contributor" title="Custom endpoint by contributor"></p> <h2 id="how-to-use">How to use</h2> <p>Select the appropriate configuration from the dropdown in the Settings:</p> <ul> <li><code>&quot;Admin user(s) only&quot;</code></li> <li><code>&quot;Use same access workflow as for editing posts&quot;</code></li> </ul> <p><img src="https://raw.githubusercontent.com/leoloso/PoP/master/layers/GraphQLAPIForWP/plugins/graphql-api-for-wp/docs-pro/implicit-features//../../images/settings-schema-editing-access.png" alt="Configuring the schema editing access in the Settings" title="Configuring the schema editing access in the Settings"></p> '}}]);