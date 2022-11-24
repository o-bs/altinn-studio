import { mdToSlate } from './slate-utils';

test('that markdown can be turned into slate', async () => {
  const slate = await mdToSlate('# Hello world\nAnd this **should** be a `paragraph`! with some *italic*  and ~~deleted~~ ofc');
  // expect(slate.type).toBe("root");
  // expect(slate.children[0].type).toBe("heading");
  console.log(JSON.stringify(slate,null,2));
});


test('that list items get rendered', async () => {
  const slate = await mdToSlate(' - List\n - items\n - should be rendered');
  // expect(slate.type).toBe("root");
  // expect(slate.children[0].type).toBe("heading");
  console.log(JSON.stringify(slate,null,2));
});

test('that it can render headings', async () => {
  const slate = await mdToSlate('# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6\nJust normal text.');
  // expect(slate.type).toBe("root");
  // expect(slate.children[0].type).toBe("heading");
  console.log(JSON.stringify(slate,null,2));
});
