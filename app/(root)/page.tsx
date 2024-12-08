import FormattedDateTime from '@/components/FormattedDateTime';
import Thumbnail from '@/components/Thumbnail';
import { getFiles, getTotalSpaceUsed } from '@/lib/actions/file.actions';
import { Models } from 'node-appwrite';
import { Chart } from '@/components/Chart';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { convertFileSize, getUsageSummary } from '@/lib/utils';

export default async function Home() {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />

        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    width={100}
                    height={100}
                    alt="uploaded image"
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>
      <section className="dashboard-recent-files">
        <h2 className="h2">Recent Files Uploaded</h2>
        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {files.documents.map((file: Models.Document) => (
            <li className="recent-file-details" key={file.$id}>
              <Thumbnail
                type={file.type}
                extension={file.extension}
                url={file.url}
                className="size-9 min-w-9"
              />
              <div>
                <p className="recent-file-name">{file.name}</p>
                <FormattedDateTime
                  date={file.$createdAt}
                  className="recent-file-date"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
