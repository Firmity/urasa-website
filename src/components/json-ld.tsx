/**
 * Renders a JSON-LD <script> tag from a plain object/array. Server
 * component — no "use client" needed, so it costs nothing on the client
 * bundle. JSON.stringify is safe here (no need for the XSS-escaping
 * dance Next's docs show for user-supplied content) because every graph
 * passed to this comes from lib/schema.ts's own static/derived data,
 * never from request input.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- trusted, non-user-supplied JSON-LD
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
