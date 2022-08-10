using System.Collections.Generic;

namespace Pit.Docker
{
    public class ImageResult
    {
        public string[] Ids;
        public string[] Names;
        public string[] MenuLines;

        public ImageResult(string output)
        {
            List<string> ids = new List<string>();
            List<string> names = new List<string>();
            List<string> menuLines = new List<string>();
            string[] lines = output.Split('\n');
            foreach (string line in lines)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;
                string[] split = line.Split(':');
                ids.Add(split[0]);
                names.Add(split[1]);
                menuLines.Add($"{split[1]} ({split[2]})");
            }

            Ids = ids.ToArray();
            Names = names.ToArray();
            MenuLines = menuLines.ToArray();
        }
    }
}