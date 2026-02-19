import QualifierBuilder from '../page';

export async function generateStaticParams() {
    return [{ id: '1' }];
}

export default function Page() {
    return <QualifierBuilder />;
}
