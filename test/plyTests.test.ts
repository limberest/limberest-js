import * as assert from 'assert';
import { URI as Uri } from 'vscode-uri';
import { PlyRoot } from '../src/plyRoots';
import * as help from './help';

describe('vs-code ply tests', function () {

    it('should be grouped', async function() {
        const plyRoot = new PlyRoot(help.workspaceFolderUri, 'requests', 'Requests');
        const plyableUris: [Uri, number][] = [
            [plyRoot.toUri('src/test/ply/up-here.request.yaml#oneUp'), 0],
            [plyRoot.toUri('src/test/ply/requests/create-movie.request.yaml#createMovie'), 0],
            [plyRoot.toUri('src/test/ply/requests/delete-movie.request.yaml#deleteMovie'), 0],
            [plyRoot.toUri('src/test/plyables/x.request.yaml#reqX1'), 0],
            [plyRoot.toUri('src/test/plyables/x.request.yaml#reqX2'), 0],
            [plyRoot.toUri('src/test/plyables/y.request.yaml#reqY'), 0],
            [plyRoot.toUri('test/ply/requests/a.request.yaml#reqA'), 0]
        ];
        plyRoot.build(plyableUris);

        assert.equal(plyRoot.toString(),
`Requests
    src/test/ply
        up-here.request.yaml
            - oneUp
    src/test/ply/requests
        create-movie.request.yaml
            - createMovie
        delete-movie.request.yaml
            - deleteMovie
    src/test/plyables
        x.request.yaml
            - reqX1
            - reqX2
        y.request.yaml
            - reqY
    test/ply/requests
        a.request.yaml
            - reqA
`);
    });

});
